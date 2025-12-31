import type { WebSocket } from 'ws';
import type { GameState } from '../domain/types';

export function emitState(socket: WebSocket, state: GameState): void {
  socket.send(JSON.stringify({ type: 'state', payload: state }));
}
