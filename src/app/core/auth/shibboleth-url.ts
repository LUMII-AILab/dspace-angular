/** Build only canonical, same-origin Shibboleth URLs. No DOM or SSR side effects. */
export function safeLoginReturn(value: string, origin: string, namespace: string): string {
  const prefix = '/' + namespace.replace(/^\/+|\/+$/g, '');
  const home = new URL(prefix + '/', origin);
  if (!value || /[\\\x00-\x20]/.test(value) || value.startsWith('//')) {
    return home.href;
  }
  try {
    // Router state is relative to Angular's base href; browser URLs include it.
    const path = value.startsWith('/') && !(value === prefix || value.startsWith(prefix + '/'))
      ? prefix + value : value;
    const url = new URL(path, home);
    if (url.origin !== home.origin || url.username || url.password ||
        !(url.pathname === prefix || url.pathname.startsWith(prefix + '/')) ||
        /%(?:25|2f|5c|2e)/i.test(url.pathname)) {
      return home.href;
    }
    return url.href;
  } catch {
    return home.href;
  }
}

export function shibbolethLoginUrl(location: string, origin: string, uiNamespace: string,
                                   restNamespace: string, returnPath: string): string {
  if (!location || !origin.startsWith('https://')) {
    throw new Error('Invalid institutional login configuration');
  }
  // The backend encodes the complete location in WWW-Authenticate. Decode that
  // wrapper only, preserving the separately encoded target and redirectUrl.
  const raw = /^(?:https?:|\/)/.test(location) ? location : decodeURIComponent(location);
  const login = new URL(raw, origin);
  if (login.origin !== origin || login.username || login.password ||
      login.pathname !== '/Shibboleth.sso/Login') {
    throw new Error('Invalid institutional login endpoint');
  }
  const callback = new URL('/' + restNamespace.replace(/^\/+|\/+$/g, '') + '/api/authn/shibboleth', origin);
  callback.searchParams.set('redirectUrl', safeLoginReturn(returnPath, origin, uiNamespace));
  // Reconstruct rather than carrying arbitrary IdP/target/return parameters.
  login.search = '';
  login.hash = '';
  login.searchParams.set('target', callback.href);
  return login.href;
}
