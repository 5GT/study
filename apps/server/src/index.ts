import { createServer } from './net/wsServer';
import { connectDb } from './storage/db';

connectDb();
const server = createServer();

server.on('listening', () => {
  console.log('WebSocket server listening');
});
