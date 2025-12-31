export interface RoomRecord {
  id: string;
  players: string[];
}

export class RoomRepo {
  private rooms = new Map<string, RoomRecord>();

  save(room: RoomRecord): void {
    this.rooms.set(room.id, room);
  }

  get(id: string): RoomRecord | undefined {
    return this.rooms.get(id);
  }
}
