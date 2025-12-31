import Phaser from 'phaser';
import { PixelRenderer } from '../render/PixelRenderer';

export class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload(): void {
    // preload minimal assets here
  }

  create(): void {
    PixelRenderer.configure(this.game);
    this.scene.start('Preload');
  }
}
