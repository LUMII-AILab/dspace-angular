/* Node-only configuration/listener regression tests; no application or sockets started. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

const root = path.resolve(__dirname, '..');
require('ts-node').register({ project: path.join(root, 'tsconfig.ts-node.json') });
const originalDirectory = process.cwd();
const originalEnvironment = { ...process.env };
const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'dspace-bind-test-'));

try {
  for (const key of Object.keys(process.env)) {
    if (key.startsWith('DSPACE_')) delete process.env[key];
  }
  process.env.NODE_ENV = 'test';
  process.chdir(directory);
  fs.mkdirSync('config');
  fs.writeFileSync('config/config.yml', 'ui:\n  host: default.example\n  port: 4000\n');
  fs.writeFileSync('config/config.test.yml', 'ui:\n  host: localhost\n  bindAddress: 127.0.0.2\nrest:\n  nameSpace: /server\n  ssrBaseUrl: http://dspace:8080/server\n');
  const { buildAppConfig } = require(path.join(root, 'src/config/config.server'));
  const { resolveUiBindAddress } = require(path.join(root, 'src/config/server-config.util'));
  const output = path.join(directory, 'public.json');
  assert.equal(buildAppConfig().ui.bindAddress, '127.0.0.2');
  const external = path.join(directory, 'external.yml');
  fs.writeFileSync(external, 'ui:\n  bindAddress: 127.0.0.3\n');
  process.env.DSPACE_APP_CONFIG_PATH = external;
  assert.equal(buildAppConfig().ui.bindAddress, '127.0.0.3');
  process.env.DSPACE_UI_BINDADDRESS = '0.0.0.0';
  const config = buildAppConfig(output);
  assert.equal(config.ui.bindAddress, '0.0.0.0');
  assert.equal(config.ui.baseUrl, 'http://localhost:4000/');
  assert.equal(config.rest.ssrBaseUrl, 'http://dspace:8080/server');
  const publicConfig = JSON.parse(fs.readFileSync(output));
  assert.equal(publicConfig.rest.baseUrl, 'http://localhost:8080/server');
  assert.equal(publicConfig.rest.ssrBaseUrl, undefined);
  assert.equal(publicConfig.ui.bindAddress, undefined);
  assert(!fs.readFileSync(output, 'utf8').includes('0.0.0.0'));
  assert(!fs.readFileSync(output, 'utf8').includes('http://dspace:'));
  delete process.env.DSPACE_UI_BINDADDRESS;
  delete process.env.DSPACE_APP_CONFIG_PATH;
  fs.writeFileSync('config/config.test.yml', 'ui:\n  host: localhost\n');
  process.env.DSPACE_HOST = 'legacy.example';
  assert.equal(buildAppConfig().ui.bindAddress, 'legacy.example');
  process.env.DSPACE_UI_BINDADDRESS = '127.0.0.1';
  assert.equal(buildAppConfig().ui.bindAddress, '127.0.0.1');
  assert.equal(buildAppConfig().ui.host, 'legacy.example');

  // Execute the actual listener functions with transport/process stubs. Importing
  // server.ts itself would bootstrap Angular and start a live application.
  const source = fs.readFileSync(path.join(root, 'server.ts'), 'utf8');
  const tree = ts.createSourceFile('server.ts', source, ts.ScriptTarget.Latest, true);
  const functions = ['run', 'createHttpsServer', 'serverStarted'];
  const selected = tree.statements.filter(statement =>
    (ts.isFunctionDeclaration(statement) && functions.includes(statement.name?.text)) ||
    (ts.isVariableStatement(statement) && statement.declarationList.declarations.some(d => d.name.getText(tree) === 'UI_BIND_ADDRESS')));
  assert.equal(selected.length, 4);
  const code = ts.transpileModule(selected.map(s => s.getText(tree)).join('\n'), {
    compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS },
  }).outputText;
  for (const ssl of [false, true]) {
    for (const bindAddress of [undefined, '0.0.0.0']) {
      const calls = [];
      const ui = { host: 'public.example', port: 4000, bindAddress, ssl, baseUrl: `${ssl ? 'https' : 'http'}://public.example:4000/` };
      const listener = { listen: (port, host, callback) => {
        calls.push({ port, host }); callback(); return listener;
      } };
      const context = {
        environment: { ui }, resolveUiBindAddress, app: () => listener,
        createServer: () => listener, createHttpTerminator: () => ({ terminate: async () => {} }),
        process: { on: () => {} }, console: { log: () => {} },
      };
      vm.runInNewContext(code + (ssl ? '\ncreateHttpsServer({});' : '\nrun();'), context);
      assert.deepEqual(calls, [{ port: 4000, host: bindAddress || 'public.example' }]);
      assert.equal(ui.host, 'public.example');
    }
  }
  console.log('Config file/environment precedence, public JSON and HTTP/HTTPS listener wiring passed.');
} finally {
  process.chdir(originalDirectory);
  for (const key of Object.keys(process.env)) {
    if (!(key in originalEnvironment)) delete process.env[key];
  }
  Object.assign(process.env, originalEnvironment);
  fs.rmSync(directory, { recursive: true });
}
