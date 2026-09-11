import { ServerConfig } from './server-config.interface';

/**
 * Server configuration related to the UI.
 */
export class UIServerConfig extends ServerConfig {

  // Optional server-only address used by Node.js when listening for connections.
  // Defaults to host so existing configurations retain their current behavior.
  bindAddress?: string;

  // rateLimiter is used to limit the amount of requests a user is allowed make in an amount of time, in order to prevent overloading the server
  rateLimiter?: {
    windowMs: number;
    max: number;
  };

  // Trust X-FORWARDED-* headers from proxies
  useProxies: boolean;
}
