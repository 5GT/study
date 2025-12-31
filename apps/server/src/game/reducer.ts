import type { GameState, ReducerEvent } from '../domain/types';
import { LiarGamePhase } from 'shared';
import { applyLiarGameRules } from './rules/liarGame';

export function reduceEvent(state: GameState, event: ReducerEvent): GameState {
  if (event.type === 'advance') {
    return { ...state, phase: nextPhase(state.phase) };
  }
  return applyLiarGameRules(state, event);
}

function nextPhase(current: LiarGamePhase): LiarGamePhase {
  const order = [
    LiarGamePhase.LOBBY,
    LiarGamePhase.ASSIGN,
    LiarGamePhase.CLUE_INPUT,
    LiarGamePhase.DISCUSSION,
    LiarGamePhase.VOTING,
    LiarGamePhase.DEFENSE,
    LiarGamePhase.KILL_DECISION,
    LiarGamePhase.END
  ];
  const idx = order.indexOf(current);
  return order[idx + 1] ?? current;
}
