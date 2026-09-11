import { isNotEmpty } from '../app/shared/empty.util';

import { ServerConfig } from './server-config.interface';
import { UIServerConfig } from './ui-server-config.interface';
import type { AppConfig } from './app-config.interface';

/**
 * Resolve the server-only UI listen address without changing the public UI URL.
 * Environment configuration has the highest precedence, followed by the
 * configured bind address and finally the public host for compatibility.
 */
export const resolveUiBindAddress = (
  config: UIServerConfig,
  environmentBindAddress?: string,
): string => {
  if (isNotEmpty(environmentBindAddress)) {
    return environmentBindAddress;
  }
  if (isNotEmpty(config.bindAddress)) {
    return config.bindAddress;
  }
  return config.host;
};

/**
 * Return only the REST configuration required by browser code. In particular,
 * the internal SSR endpoint must remain server-only.
 */
export const getPublicRestConfig = (config: ServerConfig) => ({
  baseUrl: config.baseUrl,
  nameSpace: config.nameSpace,
});

/** Copy the SSR configuration for hydration without exposing server-only routes. */
export const getBrowserTransferConfig = (config: AppConfig): AppConfig => {
  const ui = { ...config.ui };
  delete ui.bindAddress;
  return {
    ...config,
    ui,
    rest: {
      ...config.rest,
      ssrBaseUrl: '',
      hasSsrBaseUrl: isNotEmpty(config.rest.ssrBaseUrl) && config.rest.ssrBaseUrl !== config.rest.baseUrl,
    },
  };
};
