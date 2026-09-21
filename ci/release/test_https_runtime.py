#!/usr/bin/env python3
"""Disposable local HTTPS/launcher check; pinned images only, no credentials or pulls."""

import argparse, json, os, pathlib, re, shutil, subprocess, tempfile, time, uuid

ROOT = pathlib.Path(os.environ.get("CLARIN_COMPAT_ROOT", pathlib.Path(__file__).resolve().parents[1]))
# Exact linux/amd64 config identity of the accepted M05 frontend. No pull or rebuild.
FRONT = "sha256:db5eaf475dad1e43296b598d2a87b8abbed269b530e808e51a3193dd27016ba0"
PROXY = "nginx@sha256:dc5069ad14f19660b141b21236140b91656bf89bbc3e2417c70ae650cd66104c"


def run(*args, **kw):
    return subprocess.run(
        args, check=True, capture_output=True, text=True, **kw
    ).stdout.strip()


parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--frontend', default=FRONT, help='Already loaded exact Docker config digest')
parser.add_argument('--source', help='Expected full source revision label')
parser.add_argument('--report', type=pathlib.Path)
args = parser.parse_args()
if not re.fullmatch(r'sha256:[a-f0-9]{64}', args.frontend):
    raise ValueError('An exact loaded frontend config digest is required')
FRONT = args.frontend
identity = json.loads(run('docker', 'image', 'inspect', FRONT))[0]
assert identity['Id'] == FRONT and identity['Os'] == 'linux' and identity['Architecture'] == 'amd64'
if args.source:
    assert re.fullmatch(r'[a-f0-9]{40}', args.source)
    assert identity['Config']['Labels']['org.opencontainers.image.revision'] == args.source


with tempfile.TemporaryDirectory(prefix="clarin-test-") as d:
    p = pathlib.Path(d)
    os.chmod(p, 0o755)
    env = dict(os.environ, CLARIN_TEST_ROOT=d)
    result = subprocess.run(
        ["ansible-playbook", "-i", "localhost,", "tests/render.yml",
         "-e", "clarin_dspace_anubis_enabled=false"],
        cwd=ROOT,
        env=env,
        capture_output=True,
        text=True,
    )
    if result.returncode:
        raise RuntimeError("Fixture rendering failed; output suppressed")
    proxy = p / "nginx.conf"
    shutil.copy(p / "config/proxy/nginx.conf", proxy)
    os.chmod(proxy, 0o644)
    for src in ["config.prod.yml", "dspace-ui.json", "http-launcher.cjs"]:
        shutil.copy(p / "config/frontend" / src, p / src)
        os.chmod(p / src, 0o644)
    run(
        "openssl",
        "req",
        "-x509",
        "-newkey",
        "rsa:2048",
        "-nodes",
        "-days",
        "1",
        "-subj",
        "/CN=repository.clarin.test",
        "-addext",
        "subjectAltName=DNS:repository.clarin.test",
        "-keyout",
        str(p / "tls.key"),
        "-out",
        str(p / "tls.crt"),
    )
    os.chmod(p / "tls.key", 0o644)  # Disposable, self-signed test material only.
    name = "clarin-m07-smoke-" + uuid.uuid4().hex[:10]
    containers = []
    run("docker", "network", "create", "--internal", name)
    run("docker", "network", "create", name + "-ingress")

    def start(suffix, image, args, mounts=(), extra=()):
        n = name + "-" + suffix
        cmd = [
            "docker",
            "run",
            "-d",
            "--name",
            n,
            "--network",
            name,
            "--network-alias",
            suffix,
            "--cap-drop",
            "ALL",
            "--security-opt",
            "no-new-privileges",
            "--memory",
            "2g",
        ]
        for source, target in mounts:
            cmd += ["--mount", f"type=bind,source={source},target={target},readonly"]
        cmd += list(extra) + [image] + list(args)
        run(*cmd)
        containers.append(n)
        return n

    try:
        mock = "require('http').createServer((q,s)=>{if(q.url.startsWith('/repository/server/api/pid/find')){s.writeHead(302,{Location:'https://repository.clarin.test/repository/server/api/core/items/mock?via=pid'});s.end();return;}s.setHeader('content-type','application/json');s.end(JSON.stringify({status:'UP',path:q.url,host:q.headers.host,proto:q.headers['x-forwarded-proto'],prefix:q.headers['x-forwarded-prefix']}));}).listen(8080,'0.0.0.0')"
        start("dspace", FRONT, ["-e", mock], extra=["--entrypoint", "node"])
        ui = start(
            "dspace-angular",
            FRONT,
            [],
            [
                (p / "config.prod.yml", "/app/config/config.prod.yml"),
                (p / "dspace-ui.json", "/app/dspace-ui.json"),
                (p / "http-launcher.cjs", "/app/config/http-launcher.cjs"),
                (p / "tls.crt", "/app/config/ca.crt"),
            ],
            [
                "--user",
                "1000:1000",
                "-e",
                "DSPACE_APP_CONFIG_PATH=/app/config/config.prod.yml",
                "-e",
                "NODE_EXTRA_CA_CERTS=/app/config/ca.crt",
            ],
        )

        def start_proxy():
            ng = start(
                "nginx",
                PROXY,
                ["-g", "daemon off;"],
                [
                    (proxy, "/etc/nginx/nginx.conf"),
                    (p / "tls.key", "/etc/nginx/tls.key"),
                    (p / "tls.crt", "/etc/nginx/tls.crt"),
                ],
                [
                    "--user",
                    "101:101",
                    "--network-alias",
                    "repository.clarin.test",
                    "--sysctl",
                    "net.ipv4.ip_unprivileged_port_start=443",
                    "--read-only",
                    "--tmpfs",
                    "/tmp:rw,noexec,nosuid,size=16m,mode=1777",
                    "--entrypoint",
                    "nginx",
                    "-p",
                    "127.0.0.1::8080",
                    "-p",
                    "127.0.0.1::443",
                ],
            )
            run("docker", "network", "connect", name + "-ingress", ng)
            return ng

        ng = start_proxy()

        def port(target):
            return run("docker", "port", ng, str(target) + "/tcp").rsplit(":", 1)[1]

        hp, tp = port(8080), port(443)

        def request(path, headers=(), tls=True, method="GET"):
            targetport = tp if tls else hp
            scheme = "https" if tls else "http"
            cmd = [
                "curl",
                "--noproxy",
                "*",
                "--silent",
                "--show-error",
                "--connect-timeout",
                "2",
                "--max-time",
                "8",
                "--cacert",
                str(p / "tls.crt"),
                "--resolve",
                f"repository.clarin.test:{targetport}:127.0.0.1",
            ]
            if not any(h.lower().startswith("host:") for h in headers):
                cmd += ["-H", "Host: repository.clarin.test"]
            for h in headers:
                cmd += ["-H", h]
            if method == "HEAD":
                cmd += ["--head"]
            return subprocess.run(
                cmd + ["-X", method, "-i", f"{scheme}://repository.clarin.test:{targetport}{path}"],
                capture_output=True,
                text=True,
            )

        for i in range(30):
            reply = request("/repository/assets/config.json")
            if reply.returncode == 0 and "200 OK" in reply.stdout:
                break
            time.sleep(1)
        else:
            raise RuntimeError("Frontend/proxy did not become ready")
        cfg = json.loads(
            reply.stdout.split("\r\n\r\n")[-1]
            if "\r\n\r\n" in reply.stdout
            else reply.stdout.split("\n\n", 1)[1]
        )
        assert cfg["rest"]["baseUrl"] == "https://repository.clarin.test/repository/server"
        assert "ssrBaseUrl" not in cfg["rest"] and "bindAddress" not in cfg["ui"]
        redir = request("/example?x=1", tls=False).stdout
        assert (
            "308 Permanent Redirect" in redir
            and "Location: https://repository.clarin.test/example?x=1" in redir
        )
        api = request(
            "/repository/server/api",
            headers=["X-Forwarded-Host: attacker.invalid", "X-Forwarded-Proto: http", "X-Forwarded-Prefix: /attacker"],
        ).stdout
        assert (
            '"host":"repository.clarin.test"' in api
            and '"proto":"https"' in api
            and '"prefix"' not in api
            and '"path":"/repository/server/api"' in api
        )
        for source, destination in [
            ("/", "/repository/"), ("/repository", "/repository/"),
            ("/repository/xmlui", "/repository/"), ("/repository/xmlui/", "/repository/"),
            ("/repository/xmlui/login", "/repository/login"),
            ("/repository/xmlui/handle/20.500.12574/161", "/repository/handle/20.500.12574/161"),
        ]:
            reply = request(source + "?x=a%26b&y=2").stdout
            assert reply.startswith("HTTP/1.1 308"), (source, reply)
            assert "Location: https://repository.clarin.test" + destination + "?x=a%26b&y=2" in reply
            assert request(source, method="POST").stdout.startswith("HTTP/1.1 405"), source
            assert request(source, method="HEAD").stdout.startswith("HTTP/1.1 308"), source
        for retired in ["/home", "/login", "/items/example", "/handle/20.500/1", "/server/api",
                        "/repository/xmlui/discover", "/repository/xmlui/bitstream/1/file.txt"]:
            assert request(retired).stdout.startswith("HTTP/1.1 404"), retired
        # Public query and URI mapping are preserved; internal and public contexts match.
        reply = request("/repository/server/api?x=a%26b&y=2").stdout
        assert '\"path\":\"/repository/server/api?x=a%26b&y=2\"' in reply
        robots = request("/repository/robots.txt").stdout
        assert (
            "https://repository.clarin.test" in robots
            and "http://repository.clarin.test" not in robots
        )
        assert request(
            "/repository/server/api", headers=["Remote-User: administrator"]
        ).stdout.startswith("HTTP/1.1 403")
        assert (
            request("/repository/server/api", headers=["Host: attacker.invalid"]).returncode != 0
        )
        # Backend redirect leaves the initial internal REST request. It must still
        # resolve inside Docker and verify the public hostname with our CA.
        probe = "fetch('http://dspace:8080/repository/server/api/pid/find?id=hdl:test',{signal:AbortSignal.timeout(6000)}).then(async r=>{const b=await r.json();if(r.status!==200||b.path!=='/repository/server/api/core/items/mock?via=pid')process.exit(2);console.log('redirect-ok')}).catch(e=>{console.error(e.cause?.code||e.message);process.exit(1)})"
        assert run("docker", "exec", ui, "node", "-e", probe) == "redirect-ok"
        untrusted = subprocess.run(
            ["docker", "exec", "-e", "NODE_EXTRA_CA_CERTS=", ui, "node", "-e", probe],
            capture_output=True,
            text=True,
        )
        assert (
            untrusted.returncode != 0
            and "DEPTH_ZERO_SELF_SIGNED_CERT" in untrusted.stderr
        )
        wrong_host = subprocess.run(
            [
                "docker",
                "exec",
                ui,
                "node",
                "-e",
                probe.replace(
                    "http://dspace:8080/repository/server/api/pid/find?id=hdl:test",
                    "https://nginx/server/api",
                ),
            ],
            capture_output=True,
            text=True,
        )
        assert (
            wrong_host.returncode != 0
            and "ERR_TLS_CERT_ALTNAME_INVALID" in wrong_host.stderr
        )

        # Force a different proxy IP while the frontend remains running.
        old_ip = run(
            "docker",
            "inspect",
            "--format",
            '{{(index .NetworkSettings.Networks "' + name + '").IPAddress}}',
            ng,
        )
        run("docker", "rm", "-f", ng)
        containers.remove(ng)
        start(
            "old-address-holder",
            FRONT,
            ["-e", "setInterval(()=>{},1000)"],
            extra=["--entrypoint", "node", "--ip", old_ip],
        )
        ng = start_proxy()
        hp, tp = port(8080), port(443)
        new_ip = run(
            "docker",
            "inspect",
            "--format",
            '{{(index .NetworkSettings.Networks "' + name + '").IPAddress}}',
            ng,
        )
        assert old_ip != new_ip
        for i in range(15):
            reply = subprocess.run(
                ["docker", "exec", ui, "node", "-e", probe],
                capture_output=True,
                text=True,
            )
            if reply.returncode == 0:
                break
            time.sleep(1)
        else:
            raise RuntimeError("Redirect lookup did not recover after proxy IP change")
        before = time.monotonic()
        run("docker", "stop", "--time", "30", ui)
        elapsed = time.monotonic() - before
        assert run("docker", "inspect", "--format", "{{.State.ExitCode}}", ui) == "0"
        run("docker", "start", ui)
        for i in range(30):
            if "200 OK" in request("/repository/assets/config.json").stdout:
                break
            time.sleep(1)
        else:
            raise RuntimeError("Frontend restart failed")
        report = {
                    "checks": [
                        "public REST HTTPS config",
                        "private-field sanitization",
                        "fixed HTTP redirect",
                        "same-origin REST routing",
                        "controlled forwarding headers",
                        "identity spoof rejection",
                        "unknown host rejection",
                        "frontend graceful stop and restart",
                        "internal PID redirect through public DNS alias and trusted HTTPS",
                        "untrusted CA and wrong certificate hostname rejected",
                        "proxy recreation with changed IP and running frontend",
                    ],
                    "frontend_stop_seconds": round(elapsed, 2),
                    "scope": "mock backend; not integrated DSpace acceptance",
                    "frontend_config_digest": FRONT,
                    "source_revision": args.source,
                    "result": "passed",
                }
        if args.report:
            args.report.write_text(json.dumps(report, indent=2) + "\n")
        print(json.dumps(report))
    except Exception:
        for n in containers:
            print(
                subprocess.run(
                    ["docker", "logs", "--tail", "15", n],
                    capture_output=True,
                    text=True,
                ).stdout
            )
            print(
                subprocess.run(
                    ["docker", "logs", "--tail", "15", n],
                    capture_output=True,
                    text=True,
                ).stderr
            )
        raise
    finally:
        for n in reversed(containers):
            subprocess.run(["docker", "rm", "-f", n], capture_output=True)
        subprocess.run(
            ["docker", "network", "rm", name, name + "-ingress"], capture_output=True
        )
