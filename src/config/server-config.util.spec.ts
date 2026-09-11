import { ServerConfig } from './server-config.interface';
import { getBrowserTransferConfig, getPublicRestConfig, resolveUiBindAddress } from './server-config.util';
import { DefaultAppConfig } from './default-app-config';
import { UIServerConfig } from './ui-server-config.interface';

describe('Server config utilities', () => {
  describe('resolveUiBindAddress', () => {
    let config: UIServerConfig;

    beforeEach(() => {
      config = {
        ssl: false,
        host: 'public.example.org',
        port: 4000,
        nameSpace: '/',
        useProxies: true,
      };
    });

    it('should fall back to the public host for existing configurations', () => {
      expect(resolveUiBindAddress(config)).toBe('public.example.org');
    });

    it('should prefer the configured bind address over the public host', () => {
      config.bindAddress = '0.0.0.0';
      expect(resolveUiBindAddress(config)).toBe('0.0.0.0');
    });

    it('should give the environment override highest precedence', () => {
      config.bindAddress = '127.0.0.1';
      expect(resolveUiBindAddress(config, '0.0.0.0')).toBe('0.0.0.0');
    });

    it('should ignore empty overrides and leave the public host unchanged', () => {
      config.bindAddress = '';
      expect(resolveUiBindAddress(config, '')).toBe('public.example.org');
      expect(config.host).toBe('public.example.org');
    });
  });

  describe('getPublicRestConfig', () => {
    it('should omit the server-only SSR URL', () => {
      const config: ServerConfig = {
        ssl: false,
        host: 'localhost',
        port: 8080,
        nameSpace: '/server',
        baseUrl: 'http://localhost:8080/server',
        ssrBaseUrl: 'http://dspace:8080/server',
      };

      expect(getPublicRestConfig(config)).toEqual({
        baseUrl: 'http://localhost:8080/server',
        nameSpace: '/server',
      });
      expect(config.ssrBaseUrl).toBe('http://dspace:8080/server');
    });
  });

  describe('getBrowserTransferConfig', () => {
    for (const ssrBaseUrl of [undefined, 'http://localhost:8080/server', 'http://dspace:8080/server']) {
      it(`should sanitize hydration configuration for SSR URL ${ssrBaseUrl}`, () => {
        const config = new DefaultAppConfig();
        config.ui.bindAddress = '0.0.0.0';
        config.rest.baseUrl = 'http://localhost:8080/server';
        config.rest.ssrBaseUrl = ssrBaseUrl;
        const browser = getBrowserTransferConfig(config);
        expect(browser.ui.bindAddress).toBeUndefined();
        expect(browser.rest.ssrBaseUrl).toBe('');
        expect(browser.rest.hasSsrBaseUrl).toBe(ssrBaseUrl === 'http://dspace:8080/server');
        expect(browser.rest.baseUrl).toBe(config.rest.baseUrl);
        expect(config.ui.bindAddress).toBe('0.0.0.0');
        expect(config.rest.ssrBaseUrl).toBe(ssrBaseUrl);
      });
    }
  });
});
