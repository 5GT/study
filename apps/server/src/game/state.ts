import { LiarGamePhase } from 'shared';
import type { GameState } from '../domain/types';

export const initialState: GameState = {
  phase: LiarGamePhase.LOBBY,
  players: [],
  placements: []
};
