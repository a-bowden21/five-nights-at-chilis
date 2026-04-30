import Phaser from 'phaser';
import { NIGHTS } from '../data/nights.js';

export class WinScene extends Phaser.Scene {
  constructor() {
    super('WinScene');
  }

  init(data) {
    this.night = data.night || 1;
  }

  create() {
    this.add.text(512, 250, '6 AM', {
      fontFamily: 'Courier New',
      fontSize: '80px',
      color: '#ffcc00',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    this.add.text(512, 350, `You survived Night ${this.night}!`, {
      fontFamily: 'Courier New',
      fontSize: '28px',
      color: '#00ff00',
    }).setOrigin(0.5);

    // Next night button (if not the last night)
    if (this.night < NIGHTS.length) {
      const nextBtn = this.add.text(512, 460, `► Night ${this.night + 1}`, {
        fontFamily: 'Courier New',
        fontSize: '28px',
        color: '#ffcc00',
      }).setOrigin(0.5).setInteractive({ useHandCursor: true });
      nextBtn.on('pointerover', () => nextBtn.setColor('#ffffff'));
      nextBtn.on('pointerout', () => nextBtn.setColor('#ffcc00'));
      nextBtn.on('pointerdown', () => this.scene.start('GameScene', { night: this.night + 1 }));
    } else {
      this.add.text(512, 460, '🎉 You beat all 5 nights! 🎉', {
        fontFamily: 'Courier New',
        fontSize: '28px',
        color: '#00ff00',
      }).setOrigin(0.5);
    }

    // Back to menu
    const menuBtn = this.add.text(512, 530, '► Main Menu', {
      fontFamily: 'Courier New',
      fontSize: '28px',
      color: '#ffcc00',
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    menuBtn.on('pointerover', () => menuBtn.setColor('#ffffff'));
    menuBtn.on('pointerout', () => menuBtn.setColor('#ffcc00'));
    menuBtn.on('pointerdown', () => this.scene.start('MenuScene'));
  }
}

