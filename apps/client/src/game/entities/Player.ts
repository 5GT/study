export interface PlayerState {
  id: string;
  x: number;
  y: number;
  avatarId?: string;
}

export class Player {
  state: PlayerState;

  constructor(state: PlayerState) {
    this.state = state;
  }
}
