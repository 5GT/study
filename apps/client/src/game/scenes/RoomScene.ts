import Phaser from 'phaser';
import { LiarGamePhase } from 'shared';

export class RoomScene extends Phaser.Scene {
  constructor() {
    super('Room');
  }

  create(): void {
    const text = this.add.text(16, 16, `Phase: ${LiarGamePhase.LOBBY}`, {
      fontSize: '12px',
      color: '#ffffff'
    });
    text.setScrollFactor(0);
  }
}
