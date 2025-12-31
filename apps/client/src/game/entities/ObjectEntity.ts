export interface ObjectEntityState {
  id: string;
  type: string;
  x: number;
  y: number;
}

export class ObjectEntity {
  state: ObjectEntityState;

  constructor(state: ObjectEntityState) {
    this.state = state;
  }
}
