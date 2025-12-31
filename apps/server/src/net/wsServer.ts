import { WebSocketServer } from 'ws';
import { handleConnection } from './protocol';
import { serverConfig } from '../config';

export function createServer(): WebSocketServer {
  const wss = new WebSocketServer({ port: serverConfig.port });
  wss.on('connection', (socket) => handleConnection(socket));
  return wss;
}
