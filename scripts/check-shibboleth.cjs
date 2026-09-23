const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const vm = require('node:vm');
const code = ts.transpileModule(fs.readFileSync('src/app/core/auth/shibboleth-url.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
}).outputText;
const sandbox = { exports: {}, URL }; vm.runInNewContext(code, sandbox);
const {safeLoginReturn, shibbolethLoginUrl} = sandbox.exports;
const origin = 'https://repository.dev.test:8443';
const home = origin + '/repository/';
for (const bad of ['https://evil.test/repository/', '//evil.test/', 'javascript:alert(1)',
  'https://repository.dev.test/repository/', 'https://user@repository.dev.test:8443/repository/',
  '/repository/%2f%2fevil.test', '/repository/%252f%252fevil.test', '/repository/../../outside', '/\\evil.test']) {
  // Double encoding must not become a path separator after downstream decoding.
  assert.equal(safeLoginReturn(bad, origin, '/repository/'), home, bad);
}
const deep = home + 'items/example?query=a%26b&locale=lv#files';
assert.equal(safeLoginReturn('/items/example?query=a%26b&locale=lv#files', origin, '/repository/'), deep);
for (const initial of ['/Shibboleth.sso/Login?target=bad&entityID=evil', encodeURIComponent(origin + '/Shibboleth.sso/Login?target=bad')]) {
 const result = new URL(shibbolethLoginUrl(initial, origin, '/repository/', '/repository/server', deep));
 assert.equal(result.pathname, '/Shibboleth.sso/Login');
 assert.equal(result.searchParams.has('entityID'), false);
 const target = new URL(result.searchParams.get('target'));
 assert.equal(target.pathname, '/repository/server/api/authn/shibboleth');
 assert.equal(target.searchParams.get('redirectUrl'), deep);
}
for (const bad of ['https://evil.test/Shibboleth.sso/Login', '/wrong', 'https://user@repository.dev.test:8443/Shibboleth.sso/Login']) {
 assert.throws(() => shibbolethLoginUrl(bad, origin, '/repository/', '/repository/server', '/'));
}
console.log('Shibboleth nested URL and origin checks passed');
