import { config } from '../app/config';

export function connectSocket(): WebSocket {
  return new WebSocket(config.serverUrl);
}
