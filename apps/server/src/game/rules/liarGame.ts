import type { GameState, ReducerEvent } from '../../domain/types';

export function applyLiarGameRules(state: GameState, event: ReducerEvent): GameState {
  switch (event.type) {
    case 'join':
      return { ...state, players: [...state.players, event.payload] };
    case 'placement':
      return { ...state, placements: [...state.placements, event.payload] };
    default:
      return state;
  }
}
