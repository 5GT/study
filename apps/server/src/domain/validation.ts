import type { ReducerEvent } from './types';

export function isValidEvent(event: unknown): event is ReducerEvent {
  return typeof event === 'object' && event !== null && 'type' in event;
}
