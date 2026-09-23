#!/usr/bin/env python3
"""Offline recipe checks and OCI evidence validation. Never builds or publishes."""

import argparse
import hashlib
import json
import os
from pathlib import Path
import re
import subprocess
import tarfile
import tempfile

ROOT = Path(__file__).resolve().parents[2]
RECIPE = ROOT / "ci/release/image"
SHA = re.compile(r"[0-9a-f]{64}")
DIGEST = re.compile(r"sha256:[0-9a-f]{64}")


def require(condition, message):
    if not condition:
        raise ValueError(message)


def compatibility_manifest(root=ROOT / "ci/release/compatibility"):
    data = json.loads((root / "manifest.json").read_text())
    require(data.get("repository") == "LUMII-AILab/clarin-dspace-ops",
            "Unexpected compatibility repository")
    require(re.fullmatch(r"[a-f0-9]{40}", data.get("revision", "")),
            "Invalid compatibility revision")
    require(isinstance(data.get("files"), dict) and data["files"], "Missing compatibility files")
    for name, digest in data["files"].items():
        path = root / name
        require(path.resolve().is_relative_to(root.resolve()) and path.is_file(),
                "Missing or unsafe compatibility file: " + name)
        require(hashlib.sha256(path.read_bytes()).hexdigest() == digest,
                "Compatibility hash mismatch: " + name)
    return data


def inputs():
    data = json.loads((RECIPE / "toolchain.json").read_text())
    data["compatibility_revision"] = compatibility_manifest()["revision"]
    data["source_revision"] = subprocess.check_output(
        ["git", "rev-parse", "HEAD"], cwd=ROOT, text=True).strip()
    for name, key in (("package.json", "source_package_sha256"),
                      ("yarn.lock", "source_lock_sha256"),
                      ("Dockerfile.dist", "upstream_dockerfile_sha256")):
        data[key] = hashlib.sha256((ROOT / name).read_bytes()).hexdigest()
    return data


def check_manifest(data):
    require(data["source_repository"] == "https://github.com/LUMII-AILab/dspace-angular.git",
            "Unexpected source repository")
    require(data["image"] == "ghcr.io/lumii-ailab/dspace-angular", "Unexpected image destination")
    require(data["platform"] == "linux/amd64", "Only amd64 is qualified")
    for key in ("source_revision", "source_baseline"):
        require(re.fullmatch(r"[0-9a-f]{40}", data[key]), f"Unpinned {key}")
    for key in ("node_image", "buildkit_image", "sbom_generator", "skopeo_image"):
        require(re.fullmatch(r"[a-z0-9./-]+@sha256:[0-9a-f]{64}", data[key]),
                f"Unpinned {key}")
    for key in ("source_package_sha256", "source_lock_sha256", "upstream_dockerfile_sha256",
                "trivy_sha256"):
        require(SHA.fullmatch(data[key]), f"Invalid {key}")
    require(DIGEST.fullmatch(data["node_amd64_manifest"]), "Invalid Node manifest")
    require(data["node_version"] == "18.20.8" and data["yarn_version"] == "1.22.22"
            and data["pm2_version"] == "7.0.3", "Unreviewed runtime/tool version change")
    require(re.fullmatch(r"v\d+\.\d+\.\d+", data["buildx_version"]), "Unpinned Buildx")
    require(re.fullmatch(r"https://github.com/aquasecurity/trivy/releases/download/v[0-9.]+/"
                        r"trivy_[0-9.]+_Linux-64bit.tar.gz", data["trivy_url"]),
            "Unexpected scanner download")
    packages = data["apk_packages"].split()
    require(len(packages) == 3 and all(re.fullmatch(r"[a-z0-9+]+=[0-9.]+-r\d+", p)
                                     for p in packages), "Unpinned APK tools")
    require({p.split("=")[0] for p in packages} == {"python3", "make", "g++"},
            "Unexpected APK tools")
    require(all(isinstance(v, str) and "\n" not in v and "\r" not in v for v in data.values()),
            "Inputs must be single-line strings")


def check_pm2(package, lock, version):
    require(package["dependencies"] == {"pm2": version}, "Unexpected PM2 dependency")
    require(lock["lockfileVersion"] == 3, "Require npm lockfile v3")
    require(lock["packages"][""]["dependencies"] == package["dependencies"],
            "PM2 package/lock mismatch")
    require(lock["packages"]["node_modules/pm2"]["version"] == version, "PM2 lock mismatch")
    for name, entry in lock["packages"].items():
        if name:
            require(entry.get("resolved", "").startswith("https://registry.npmjs.org/"),
                    f"Non-registry PM2 dependency: {name}")
            require(entry.get("integrity", "").startswith("sha512-"),
                    f"Missing PM2 integrity: {name}")


def check_recipe():
    data = inputs()
    check_manifest(data)
    check_pm2(json.loads((RECIPE / "pm2/package.json").read_text()),
              json.loads((RECIPE / "pm2/package-lock.json").read_text()), data["pm2_version"])
    workflow = (ROOT / ".github/workflows/clarin-release.yml").read_text()
    actions = re.findall(r"uses: ([^\s]+)", workflow)
    require(all(re.fullmatch(r"[\w-]+/[\w-]+@[0-9a-f]{40}", a) for a in actions),
            "Actions must be pinned")
    require("cache-from: type=gha" in workflow and "cache-to:" in workflow,
            "Persistent cache required")


def workflow_outputs():
    check_recipe()
    data = inputs()
    data["tag"] = "sha-" + data["source_revision"]
    (RECIPE / "inputs.json").write_text(json.dumps(data, indent=2) + "\n")
    for key, value in data.items():
        print(f"{key}={value}")


def export_source(repository, revision, destination, evidence, data):
    """Export a verified commit, never a checkout or its submodule contents."""
    require(re.fullmatch(r"[0-9a-f]{40}", revision), "Unpinned source revision")
    git = ["git", "-C", str(repository)]
    actual = subprocess.check_output(git + ["rev-parse", f"{revision}^{{commit}}"],
                                     text=True).strip()
    require(actual == data["source_revision"], "Fetched source revision mismatch")
    tree = subprocess.check_output(git + ["rev-parse", f"{revision}^{{tree}}"],
                                   text=True).strip()
    entries = subprocess.check_output(git + ["ls-tree", "-rz", revision]).split(b"\0")
    submodules = [entry.split(b"\t", 1)[1].decode() for entry in entries
                  if entry.startswith(b"160000 ")]
    require(submodules == [".dspace-skills"], "Unreviewed source submodules")
    # No overwrite/reuse of a potentially contaminated existing context.
    destination.mkdir(parents=True, exist_ok=False)
    with tempfile.TemporaryFile() as archive:
        subprocess.run(git + ["archive", "--format=tar", revision], stdout=archive, check=True)
        archive.seek(0)
        archive_sha = hashlib.file_digest(archive, "sha256").hexdigest()
        archive.seek(0)
        with tarfile.open(fileobj=archive) as bundle:
            bundle.extractall(destination, filter="data")
    require(not (destination / ".git").exists(), "Git metadata in source export")
    for path in submodules:
        entry = destination / path
        require(not entry.exists() or (entry.is_dir() and not any(entry.iterdir())),
                "Submodule contents in source export")
    for name, key in (("package.json", "source_package_sha256"),
                      ("yarn.lock", "source_lock_sha256"),
                      ("Dockerfile.dist", "upstream_dockerfile_sha256")):
        require(hashlib.sha256((destination / name).read_bytes()).hexdigest() == data[key],
                f"Source hash mismatch: {name}")
    evidence.mkdir(parents=True, exist_ok=True)
    result = {"source_repository": data["source_repository"], "source_revision": actual,
              "source_tree": tree, "archive_sha256": archive_sha,
              "excluded_submodules": submodules}
    (evidence / "source-export.json").write_text(json.dumps(result, indent=2) + "\n")


def prepare_source(destination, evidence):
    """Fetch only the public superproject; no recursive fetch or private credentials."""
    data = inputs()
    check_manifest(data)
    export_source(ROOT, data["source_revision"], destination, evidence, data)
    print(f"context={destination.resolve()}")


def inspect_archive(archive, expected_digest, evidence):
    """Verify reachable OCI blobs without extracting filesystem layers or executing code."""
    require(DIGEST.fullmatch(expected_digest), "Invalid expected digest")
    statements = []
    runtime = []
    visited = set()
    with tarfile.open(archive, "r:*") as bundle:
        members = {}
        for member in bundle.getmembers():
            name = member.name.removeprefix("./")
            require(not member.issym() and not member.islnk(), "Archive links forbidden")
            require(member.isfile() or member.isdir(), "Archive special files forbidden")
            require(not name.startswith("/") and ".." not in Path(name).parts,
                    "Unsafe archive member")
            if member.isfile():
                require(name in ("index.json", "oci-layout") or
                        re.fullmatch(r"blobs/sha256/[0-9a-f]{64}", name),
                        "Unexpected archive file")
                require(name not in members, "Duplicate archive member")
                members[name] = member

        def read_json(name):
            member = members[name]
            require(member.size < 20 * 1024 * 1024, "Oversized OCI metadata")
            return json.load(bundle.extractfile(member))

        def visit(descriptor):
            digest = descriptor["digest"]
            require(DIGEST.fullmatch(digest), "Unsupported blob digest")
            if digest in visited:
                return
            visited.add(digest)
            name = "blobs/sha256/" + digest.split(":")[1]
            member = members[name]
            require(member.size == descriptor["size"], "Blob size mismatch")
            with bundle.extractfile(member) as stream:
                require(hashlib.file_digest(stream, "sha256").hexdigest() == digest.split(":")[1],
                        "Blob digest mismatch")
            media = descriptor["mediaType"]
            if media.endswith("image.index.v1+json"):
                for child in read_json(name)["manifests"]:
                    visit(child)
            elif media.endswith("image.manifest.v1+json"):
                manifest = read_json(name)
                visit(manifest["config"])
                config = read_json("blobs/sha256/" + manifest["config"]["digest"].split(":")[1])
                if config.get("architecture") == "amd64" and config.get("os") == "linux":
                    runtime.append((digest, manifest["config"]["digest"], config))
                for layer in manifest["layers"]:
                    visit(layer)
            elif media == "application/vnd.in-toto+json":
                statements.append(read_json(name))

        index = read_json("index.json")
        require(len(index["manifests"]) == 1, "Expected one exported image/index")
        require(index["manifests"][0]["digest"] == expected_digest, "Build/export digest mismatch")
        visit(index["manifests"][0])
    require(len(runtime) == 1, "Expected one Linux amd64 runtime image")
    runtime_digest, config_digest, config = runtime[0]
    require(config["config"]["User"] == "1000:1000", "Wrong runtime user")
    require(config["config"]["Labels"]["org.opencontainers.image.revision"] ==
            inputs()["source_revision"], "Wrong frontend source label")
    bound = [s for s in statements if any(
        sub.get("digest", {}).get("sha256") == runtime_digest.split(":")[1]
        for sub in s.get("subject", []))]
    require(any(s.get("predicateType", "").startswith("https://slsa.dev/provenance/")
                for s in bound), "Missing image-bound provenance")
    require(any(s.get("predicateType") == "https://spdx.dev/Document" for s in bound),
            "Missing image-bound SPDX SBOM")
    evidence.mkdir(parents=True, exist_ok=True)
    for number, statement in enumerate(bound):
        (evidence / f"attestation-{number}.json").write_text(json.dumps(statement, indent=2) + "\n")
    result = {"index_digest": expected_digest, "amd64_manifest_digest": runtime_digest,
              "source_revision": inputs()["source_revision"], "config_digest": config_digest,
              "verified_blobs": len(visited)}
    (evidence / "identity.json").write_text(json.dumps(result, indent=2) + "\n")
    return result


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest="command", required=True)
    sub.add_parser("check")
    sub.add_parser("outputs")
    source = sub.add_parser("prepare-source")
    source.add_argument("destination", type=Path)
    source.add_argument("evidence", type=Path)
    inspect = sub.add_parser("inspect")
    inspect.add_argument("archive", type=Path)
    inspect.add_argument("digest")
    inspect.add_argument("evidence", type=Path)
    args = parser.parse_args()
    if args.command == "check":
        check_recipe()
        print("Frontend recipe, locks and workflow policy passed (no build).")
    elif args.command == "outputs":
        workflow_outputs()
    elif args.command == "prepare-source":
        prepare_source(args.destination, args.evidence)
    else:
        print(json.dumps(inspect_archive(args.archive, args.digest, args.evidence)))


if __name__ == "__main__":
    main()
