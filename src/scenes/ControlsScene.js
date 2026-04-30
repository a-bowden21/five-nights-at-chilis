import Phaser from 'phaser';

export class ControlsScene extends Phaser.Scene {
  constructor() {
    super('ControlsScene');
  }

  create() {
    // Title
    this.add.text(512, 120, 'CONTROLS', {
      fontFamily: 'Courier New',
      fontSize: '48px',
      color: '#00ccff',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    // Controls list
    const controls = [
      ['A', 'Toggle Left Door'],
      ['D', 'Toggle Right Door'],
      ['SPACE', 'Open / Close Cameras'],
      ['← →', 'Cycle Cameras'],
      ['MOUSE', 'Click map nodes to switch cameras'],
    ];

    const startY = 240;
    for (let i = 0; i < controls.length; i++) {
      const [key, desc] = controls[i];

      // Key label
      this.add.text(380, startY + i * 60, key, {
        fontFamily: 'Courier New',
        fontSize: '22px',
        color: '#ffcc00',
        backgroundColor: '#222',
        padding: { x: 10, y: 6 },
      }).setOrigin(1, 0.5);

      // Description
      this.add.text(400, startY + i * 60, desc, {
        fontFamily: 'Courier New',
        fontSize: '18px',
        color: '#cccccc',
      }).setOrigin(0, 0.5);
    }

    // Back button
    const backBtn = this.add.text(512, 620, '[ BACK ]', {
      fontFamily: 'Courier New',
      fontSize: '24px',
      color: '#ff2222',
      backgroundColor: '#111',
      padding: { x: 20, y: 10 },
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    backBtn.on('pointerover', () => backBtn.setColor('#ffffff'));
    backBtn.on('pointerout', () => backBtn.setColor('#ff2222'));
    backBtn.on('pointerdown', () => {
      this.scene.start('MenuScene');
    });
  }
}

