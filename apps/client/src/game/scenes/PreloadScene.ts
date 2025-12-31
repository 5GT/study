import Phaser from 'phaser';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super('Preload');
  }

  preload(): void {
    // load assets placeholder
  }

  create(): void {
    this.scene.start('Room');
  }
}
