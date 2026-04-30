import Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  create() {
    // Title
    this.add.text(512, 200, "FIVE NIGHTS\nAT CHILI'S", {
      fontFamily: 'Courier New',
      fontSize: '64px',
      color: '#ff2222',
      align: 'center',
      fontStyle: 'bold',
      shadow: { offsetX: 3, offsetY: 3, color: '#000', blur: 8, fill: true },
    }).setOrigin(0.5);

    // Subtitle
    this.add.text(512, 340, 'Can you survive five nights?', {
      fontFamily: 'Courier New',
      fontSize: '20px',
      color: '#cccccc',
    }).setOrigin(0.5);

    // Night select buttons
    for (let i = 1; i <= 5; i++) {
      const btn = this.add.text(512, 370 + i * 50, `► Night ${i}`, {
        fontFamily: 'Courier New',
        fontSize: '26px',
        color: '#ffcc00',
      }).setOrigin(0.5).setInteractive({ useHandCursor: true });

      btn.on('pointerover', () => btn.setColor('#ffffff'));
      btn.on('pointerout', () => btn.setColor('#ffcc00'));
      btn.on('pointerdown', () => {
        this.scene.start('GameScene', { night: i });
      });
    }

    // Controls button
    const controlsBtn = this.add.text(512, 700, '[ CONTROLS ]', {
      fontFamily: 'Courier New',
      fontSize: '20px',
      color: '#00ccff',
      backgroundColor: '#111',
      padding: { x: 16, y: 8 },
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    controlsBtn.on('pointerover', () => controlsBtn.setColor('#ffffff'));
    controlsBtn.on('pointerout', () => controlsBtn.setColor('#00ccff'));
    controlsBtn.on('pointerdown', () => {
      this.scene.start('ControlsScene');
    });
  }
}
