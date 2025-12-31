import type { WebSocket } from 'ws';
import { reduceEvent } from '../game/reducer';
import { initialState } from '../game/state';
import { emitState } from '../game/emit';
import { isValidEvent } from '../domain/validation';

export function handleConnection(socket: WebSocket): void {
  let state = initialState;
  emitState(socket, state);

  socket.on('message', (raw) => {
    try {
      const event = JSON.parse(raw.toString());
      if (isValidEvent(event)) {
        state = reduceEvent(state, event);
        emitState(socket, state);
      }
    } catch (err) {
      console.error('Failed to handle message', err);
    }
  });
}
