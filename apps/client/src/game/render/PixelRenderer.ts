import Phaser from 'phaser';

export class PixelRenderer {
  static configure(game: Phaser.Game): void {
    const canvas = game.canvas;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (context) {
      context.imageSmoothingEnabled = false;
    }
  }
}
