import type { GameState } from '../../domain/types';

export function handleDisconnect(state: GameState, playerId: string): GameState {
  return { ...state, players: state.players.filter((p) => p.id !== playerId) };
}
