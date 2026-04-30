import Phaser from 'phaser';

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOverScene');
  }

  init(data) {
    this.night = data.night || 1;
  }

  create() {
    // Jumpscare placeholder — red flash
    this.cameras.main.flash(500, 255, 0, 0);

    this.add.text(512, 300, 'GAME OVER', {
      fontFamily: 'Courier New',
      fontSize: '72px',
      color: '#ff0000',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    this.add.text(512, 400, 'You didn\'t survive the night...', {
      fontFamily: 'Courier New',
      fontSize: '22px',
      color: '#cc0000',
    }).setOrigin(0.5);

    // Retry
    const retryBtn = this.add.text(512, 500, '► Retry Night', {
      fontFamily: 'Courier New',
      fontSize: '28px',
      color: '#ffcc00',
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    retryBtn.on('pointerover', () => retryBtn.setColor('#ffffff'));
    retryBtn.on('pointerout', () => retryBtn.setColor('#ffcc00'));
    retryBtn.on('pointerdown', () => this.scene.start('GameScene', { night: this.night }));

    // Menu
    const menuBtn = this.add.text(512, 560, '► Main Menu', {
      fontFamily: 'Courier New',
      fontSize: '28px',
      color: '#ffcc00',
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    menuBtn.on('pointerover', () => menuBtn.setColor('#ffffff'));
    menuBtn.on('pointerout', () => menuBtn.setColor('#ffcc00'));
    menuBtn.on('pointerdown', () => this.scene.start('MenuScene'));
  }
}

