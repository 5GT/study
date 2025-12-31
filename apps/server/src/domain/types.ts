import type { Placement, Avatar } from 'shared';
import { LiarGamePhase } from 'shared';

export interface PlayerInfo {
  id: string;
  name: string;
  avatar?: Avatar;
}

export interface GameState {
  phase: LiarGamePhase;
  players: PlayerInfo[];
  placements: Placement[];
}

export type ReducerEvent =
  | { type: 'advance' }
  | { type: 'join'; payload: PlayerInfo }
  | { type: 'placement'; payload: Placement };
