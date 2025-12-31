import type { GameState } from '../../domain/types';
import type { Placement } from 'shared';

export function addPlacement(state: GameState, placement: Placement): GameState {
  return { ...state, placements: [...state.placements, placement] };
}
