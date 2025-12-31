import type { ClientToServerEvents, ServerToClientEvents } from 'shared';

export type OutgoingEvent = keyof ClientToServerEvents;
export type IncomingEvent = keyof ServerToClientEvents;
