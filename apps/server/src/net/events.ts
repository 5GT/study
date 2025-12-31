import type { ClientToServerEvents, ServerToClientEvents } from 'shared';

export type IncomingEvent = keyof ClientToServerEvents | 'ping';
export type OutgoingEvent = keyof ServerToClientEvents | 'welcome';
