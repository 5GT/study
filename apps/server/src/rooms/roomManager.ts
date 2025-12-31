export class RoomManager {
  private rooms = new Map<string, string[]>();

  createRoom(id: string): void {
    this.rooms.set(id, []);
  }

  addPlayer(roomId: string, playerId: string): void {
    const room = this.rooms.get(roomId) ?? [];
    room.push(playerId);
    this.rooms.set(roomId, room);
  }
}
