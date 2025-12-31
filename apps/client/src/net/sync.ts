import type { Placement } from 'shared';
import { connectSocket } from './socket';

export function syncPlacements(placements: Placement[]): void {
  const socket = connectSocket();
  socket.addEventListener('open', () => {
    socket.send(JSON.stringify({ type: 'placements', payload: placements }));
  });
}
