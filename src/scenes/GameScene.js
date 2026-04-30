import Phaser from 'phaser';
import { ROOMS, ROOM_MAP } from '../data/rooms.js';
import { NIGHTS } from '../data/nights.js';
import { Enemy } from '../entities/Enemy.js';
import { CameraSystem } from '../systems/CameraSystem.js';
import { PowerSystem } from '../systems/PowerSystem.js';
import { NightManager } from '../systems/NightManager.js';

export class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  init(data) {
    this.nightIndex = (data.night || 1) - 1;
  }

  preload() {
    this.load.image('tung-sahur', '/images/tung-sahur.png');
  }

  create() {
    const nightConfig = NIGHTS[this.nightIndex];
    this.gameOver = false;

    // ---- Systems ----
    this.nightManager = new NightManager(this, nightConfig.night, nightConfig.duration);
    this.powerSystem = new PowerSystem(this, nightConfig.powerDrainRate);
    this.cameraSystem = new CameraSystem(this);
    this.cameraSystem.init(ROOMS);

    // ---- Enemies ----
    this.enemies = nightConfig.enemies.map((cfg) => new Enemy(cfg));

    // ---- Office view (background placeholder) ----
    this.officeBackground = this.add.rectangle(512, 384, 1024, 768, 0x1a0a0a)
      .setDepth(0);
    this.add.text(512, 300, '🪑  Office  🪑', {
      fontFamily: 'Courier New',
      fontSize: '36px',
      color: '#555',
    }).setOrigin(0.5).setDepth(1);

    // ---- Door controls ----
    this.leftDoorClosed = false;
    this.rightDoorClosed = false;

    // Left door visual indicator
    this.leftDoorVisual = this.add.rectangle(30, 384, 50, 400, 0x444444)
      .setDepth(50);
    this.leftDoorBtn = this.add.text(10, 600, 'L\nDOOR', {
      fontFamily: 'Courier New',
      fontSize: '14px',
      color: '#00ff00',
      backgroundColor: '#222',
      padding: { x: 6, y: 6 },
      align: 'center',
    }).setDepth(200).setInteractive({ useHandCursor: true });
    this.leftDoorBtn.on('pointerdown', () => this.toggleLeftDoor());

    // Right door visual indicator
    this.rightDoorVisual = this.add.rectangle(994, 384, 50, 400, 0x444444)
      .setDepth(50);
    this.rightDoorBtn = this.add.text(975, 600, 'R\nDOOR', {
      fontFamily: 'Courier New',
      fontSize: '14px',
      color: '#00ff00',
      backgroundColor: '#222',
      padding: { x: 6, y: 6 },
      align: 'center',
    }).setDepth(200).setInteractive({ useHandCursor: true });
    this.rightDoorBtn.on('pointerdown', () => this.toggleRightDoor());

    // ---- Camera toggle button ----
    this.cameraBtn = this.add.text(512, 740, '[ OPEN CAMERAS ]', {
      fontFamily: 'Courier New',
      fontSize: '22px',
      color: '#00ccff',
      backgroundColor: '#111',
      padding: { x: 16, y: 8 },
    }).setOrigin(0.5).setDepth(200).setInteractive({ useHandCursor: true });

    this.cameraBtn.on('pointerdown', () => {
      if (this.cameraSystem.isOpen) {
        this.cameraSystem.close();
        this.cameraBtn.setText('[ OPEN CAMERAS ]');
        this.setDoorControlsVisible(true);
        this.sound.play('camera_close');
      } else {
        this.cameraSystem.open();
        this.cameraBtn.setText('[ CLOSE CAMERAS ]');
        this.setDoorControlsVisible(false);
        this.sound.play('camera_open');
      }
    });

    // ---- Warning text (shows when enemy is at door) ----
    this.warningText = this.add.text(512, 500, '', {
      fontFamily: 'Courier New',
      fontSize: '26px',
      color: '#ff0000',
      align: 'center',
    }).setOrigin(0.5).setDepth(90);

    // ---- Keyboard controls ----
    this.input.keyboard.on('keydown-A', () => {
      this.toggleLeftDoor();
    });
    this.input.keyboard.on('keydown-D', () => {
      this.toggleRightDoor();
    });
    this.input.keyboard.on('keydown-SPACE', () => {
      if (this.cameraSystem.isOpen) {
        this.cameraSystem.close();
        this.cameraBtn.setText('[ OPEN CAMERAS ]');
        this.setDoorControlsVisible(true);
        this.sound.play('camera_close');
      } else {
        this.cameraSystem.open();
        this.cameraBtn.setText('[ CLOSE CAMERAS ]');
        this.setDoorControlsVisible(false);
        this.sound.play('camera_open');
      }
    });
  }

  update(time, delta) {
    if (this.gameOver) return;

    // --- Night clock ---
    const nightOver = this.nightManager.update(delta);
    if (nightOver) {
      this.gameOver = true;
      this.scene.start('WinScene', { night: this.nightIndex + 1 });
      return;
    }

    // --- Power ---
    this.powerSystem.update(delta, this.cameraSystem.isOpen, this.leftDoorClosed, this.rightDoorClosed);
    if (this.powerSystem.isOut()) {
      // Power out — doors forced open, vulnerable
      this.leftDoorClosed = false;
      this.rightDoorClosed = false;
      this.updateDoorVisuals();
    }

    // --- Enemies ---
    let attacked = false;
    for (const enemy of this.enemies) {
      enemy.update(delta);

      // Play movement sound when enemy changes rooms
      if (enemy.justMoved) {
        const moveKey = `move_${enemy.id}`;
        if (this.sound.get(moveKey) || this.cache.audio.has(moveKey)) {
          this.sound.play(moveKey, { volume: 0.4 });
        }
      }

      if (enemy.atDoor) {
        // Determine which side the enemy is attacking from
        const lastRoom = enemy.currentRoom;
        const roomData = ROOM_MAP[lastRoom];
        const side = roomData && roomData.side; // 'left' or 'right'

        if (side === 'left' && this.leftDoorClosed) {
          // Blocked by left door
          enemy.reset();
        } else if (side === 'right' && this.rightDoorClosed) {
          // Blocked by right door
          enemy.reset();
        } else if (!side && (this.leftDoorClosed || this.rightDoorClosed)) {
          // Fallback — unknown side, any door blocks
          enemy.reset();
        } else {
          // Got through — game over
          attacked = true;
        }
      }
    }

    if (attacked) {
      this.gameOver = true;
      this.sound.play('jumpscare');
      // Delay scene transition so the jumpscare sound plays
      this.time.delayedCall(800, () => {
        this.scene.start('GameOverScene', { night: this.nightIndex + 1 });
      });
      return;
    }

    // --- Update camera feed enemy display ---
    this.cameraSystem.updateEnemyDisplay(this.enemies);

    // No warnings in the office — you have to use the cameras to track them
  }

  setDoorControlsVisible(visible) {
    this.leftDoorVisual.setVisible(visible);
    this.leftDoorBtn.setVisible(visible);
    this.rightDoorVisual.setVisible(visible);
    this.rightDoorBtn.setVisible(visible);
  }

  toggleLeftDoor() {
    if (this.powerSystem.isOut() || this.cameraSystem.isOpen) return;
    this.leftDoorClosed = !this.leftDoorClosed;
    this.updateDoorVisuals();
    this.sound.play(this.leftDoorClosed ? 'door_close' : 'door_open');
  }

  toggleRightDoor() {
    if (this.powerSystem.isOut() || this.cameraSystem.isOpen) return;
    this.rightDoorClosed = !this.rightDoorClosed;
    this.updateDoorVisuals();
    this.sound.play(this.rightDoorClosed ? 'door_close' : 'door_open');
  }

  updateDoorVisuals() {
    this.leftDoorVisual.setFillStyle(this.leftDoorClosed ? 0xff0000 : 0x444444);
    this.leftDoorBtn.setColor(this.leftDoorClosed ? '#ff0000' : '#00ff00');
    this.leftDoorBtn.setText(this.leftDoorClosed ? 'L\nSHUT' : 'L\nDOOR');

    this.rightDoorVisual.setFillStyle(this.rightDoorClosed ? 0xff0000 : 0x444444);
    this.rightDoorBtn.setColor(this.rightDoorClosed ? '#ff0000' : '#00ff00');
    this.rightDoorBtn.setText(this.rightDoorClosed ? 'R\nSHUT' : 'R\nDOOR');
  }
}
