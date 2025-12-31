export class ThumbnailRepo {
  private thumbnails = new Map<string, string>();

  save(id: string, dataUrl: string): void {
    this.thumbnails.set(id, dataUrl);
  }

  get(id: string): string | undefined {
    return this.thumbnails.get(id);
  }
}
