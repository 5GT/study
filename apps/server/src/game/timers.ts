export interface Timer {
  id: string;
  durationMs: number;
}

export function scheduleTimer(timer: Timer): void {
  // placeholder for scheduling logic
  console.log('Scheduling timer', timer);
}
