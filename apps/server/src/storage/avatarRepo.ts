export interface AvatarRecord {
  id: string;
  layers: string[];
}

export class AvatarRepo {
  private avatars = new Map<string, AvatarRecord>();

  save(avatar: AvatarRecord): void {
    this.avatars.set(avatar.id, avatar);
  }

  get(id: string): AvatarRecord | undefined {
    return this.avatars.get(id);
  }
}
