import Phaser from 'phaser';

export class EditScene extends Phaser.Scene {
  constructor() {
    super('Edit');
  }

  create(): void {
    this.add.text(16, 32, 'Edit scene placeholder', { color: '#ffcc00' });
  }
}
