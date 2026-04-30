/**
 * Manages the camera monitor UI and switching between camera feeds.
 * Shows room decorations, descriptions, Pepper Pal locations,
 * and a visual map of the restaurant layout.
 */
export class CameraSystem {
  /**
   * @param {Phaser.Scene} scene
   */
  constructor(scene) {
    this.scene = scene;
    this.isOpen = false;
    this.currentCameraId = null;

    // --- Camera monitor overlay (full-screen dark tint) ---
    this.overlay = scene.add.rectangle(512, 384, 1024, 768, 0x000000, 0.85)
      .setDepth(100)
      .setVisible(false);

    // --- Static noise effect ---
    this.static = scene.add.rectangle(350, 280, 580, 460, 0x111111)
      .setDepth(101)
      .setVisible(false);

    // --- Camera feed label ---
    this.cameraLabel = scene.add.text(350, 65, '', {
      fontFamily: 'Courier New',
      fontSize: '24px',
      color: '#00ff00',
      stroke: '#003300',
      strokeThickness: 2,
    }).setOrigin(0.5).setDepth(103).setVisible(false);

    // --- Room description ---
    this.roomDescription = scene.add.text(350, 95, '', {
      fontFamily: 'Courier New',
      fontSize: '12px',
      color: '#33aa33',
      fontStyle: 'italic',
    }).setOrigin(0.5).setDepth(103).setVisible(false);

    // --- Room decoration display ---
    this.decorText = scene.add.text(350, 220, '', {
      fontFamily: 'Courier New',
      fontSize: '20px',
      color: '#aaaaaa',
      align: 'center',
      lineSpacing: 8,
    }).setOrigin(0.5).setDepth(102).setVisible(false);

    // --- Enemy presence display (emoji + name) ---
    this.enemyText = scene.add.text(350, 400, '', {
      fontFamily: 'Courier New',
      fontSize: '28px',
      color: '#ff4444',
      align: 'center',
      lineSpacing: 6,
    }).setOrigin(0.5).setDepth(103).setVisible(false);

    // --- "REC" indicator ---
    this.recIndicator = scene.add.text(80, 65, '● REC', {
      fontFamily: 'Courier New',
      fontSize: '16px',
      color: '#ff0000',
    }).setDepth(103).setVisible(false);

    // Blink the REC indicator
    scene.time.addEvent({
      delay: 800,
      loop: true,
      callback: () => {
        if (this.isOpen) {
          this.recIndicator.setVisible(!this.recIndicator.visible);
        }
      },
    });

    // --- Map elements (created in init) ---
    this.mapNodes = {};
    this.mapLines = [];
    this.mapContainer = [];
  }

  /**
   * Called once from GameScene.create() to wire up room data.
   * @param {Array} rooms
   */
  init(rooms) {
    this.rooms = rooms;
    this.createMap();

    // Keyboard navigation — left/right arrows cycle cameras
    this.scene.input.keyboard.on('keydown-LEFT', () => {
      if (this.isOpen) this.cycleCameraPrev();
    });
    this.scene.input.keyboard.on('keydown-RIGHT', () => {
      if (this.isOpen) this.cycleCameraNext();
    });
  }

  /** Build the interactive visual map on the right side of the monitor. */
  createMap() {
    const scene = this.scene;
    const depth = 103;

    // Map background panel
    const mapBg = scene.add.rectangle(820, 400, 340, 600, 0x0a1a0a, 0.9)
      .setDepth(102).setVisible(false).setStrokeStyle(1, 0x00ff00);
    this.mapContainer.push(mapBg);

    // Map title
    const mapTitle = scene.add.text(820, 115, '— MAP —', {
      fontFamily: 'Courier New',
      fontSize: '14px',
      color: '#00ff00',
    }).setOrigin(0.5).setDepth(depth).setVisible(false);
    this.mapContainer.push(mapTitle);

    // Node positions on the map
    // LEFT SIDE:  Alley → Kitchen → Expo → Left Hallway
    //                        ↕
    //                   Supply Closet
    //
    // RIGHT SIDE: Lobby → Bar → Restrooms → Right Hallway
    //               ↓
    //           Party A → Party B → Right Hallway
    //
    //         Left Hallway ← OFFICE → Right Hallway
    const nodePositions = {
      back_alley:        { x: 690, y: 155 },
      kitchen:           { x: 780, y: 155 },
      supply_closet:     { x: 780, y: 220 },
      expo_window:       { x: 870, y: 155 },
      left_hallway:      { x: 760, y: 510 },
      lobby:             { x: 690, y: 310 },
      bar_area:          { x: 780, y: 310 },
      restrooms_hallway: { x: 870, y: 310 },
      party_room_a:      { x: 690, y: 395 },
      party_room_b:      { x: 780, y: 395 },
      right_hallway:     { x: 900, y: 510 },
    };

    // Short labels for the map nodes
    const nodeLabels = {
      back_alley:        'Alley',
      kitchen:           'Kitchen',
      supply_closet:     'Supply',
      expo_window:       'Expo',
      left_hallway:      'L Hall',
      lobby:             'Lobby',
      bar_area:          'Bar',
      restrooms_hallway: 'Restroom',
      party_room_a:      'Party A',
      party_room_b:      'Party B',
      right_hallway:     'R Hall',
    };

    // Connection lines between rooms
    const connections = [
      ['back_alley', 'kitchen'],
      ['kitchen', 'expo_window'],
      ['kitchen', 'supply_closet'],
      ['kitchen', 'lobby'],
      ['expo_window', 'left_hallway'],
      ['lobby', 'bar_area'],
      ['bar_area', 'restrooms_hallway'],
      ['restrooms_hallway', 'right_hallway'],
      ['lobby', 'party_room_a'],
      ['party_room_a', 'party_room_b'],
      ['party_room_b', 'right_hallway'],
    ];

    // Draw connection lines
    const gfx = scene.add.graphics().setDepth(depth - 1).setVisible(false);
    gfx.lineStyle(1, 0x005500);
    for (const [fromId, toId] of connections) {
      const from = nodePositions[fromId];
      const to = nodePositions[toId];
      gfx.lineBetween(from.x, from.y, to.x, to.y);
    }
    this.mapContainer.push(gfx);

    // Draw the office icon at the bottom center between the hallways
    const officeIcon = scene.add.text(830, 565, '🏢 OFFICE', {
      fontFamily: 'Courier New',
      fontSize: '11px',
      color: '#888888',
    }).setOrigin(0.5).setDepth(depth).setVisible(false);
    this.mapContainer.push(officeIcon);

    // Draw door labels under each hallway
    const leftDoorLabel = scene.add.text(760, 540, '◄ L Door', {
      fontFamily: 'Courier New',
      fontSize: '8px',
      color: '#666666',
    }).setOrigin(0.5).setDepth(depth).setVisible(false);
    this.mapContainer.push(leftDoorLabel);

    const rightDoorLabel = scene.add.text(900, 540, 'R Door ►', {
      fontFamily: 'Courier New',
      fontSize: '8px',
      color: '#666666',
    }).setOrigin(0.5).setDepth(depth).setVisible(false);
    this.mapContainer.push(rightDoorLabel);

    // Draw room nodes
    for (const room of this.rooms) {
      const pos = nodePositions[room.id];
      if (!pos) continue;

      // Node background circle
      const nodeBg = scene.add.circle(pos.x, pos.y, 5, 0x003300)
        .setDepth(depth).setVisible(false);

      // Node label
      const label = scene.add.text(pos.x, pos.y + 12, nodeLabels[room.id] || room.id, {
        fontFamily: 'Courier New',
        fontSize: '9px',
        color: '#00aa00',
        align: 'center',
      }).setOrigin(0.5).setDepth(depth).setVisible(false)
        .setInteractive({ useHandCursor: true });

      // Click to switch camera
      label.on('pointerdown', () => this.switchCamera(room.id));
      label.on('pointerover', () => label.setColor('#ffffff'));
      label.on('pointerout', () => {
        label.setColor(room.id === this.currentCameraId ? '#ffff00' : '#00aa00');
      });

      this.mapNodes[room.id] = { bg: nodeBg, label };
      this.mapContainer.push(nodeBg, label);
    }
  }

  /** Open the camera monitor. */
  open() {
    this.isOpen = true;
    this.overlay.setVisible(true);
    this.static.setVisible(true);
    this.cameraLabel.setVisible(true);
    this.roomDescription.setVisible(true);
    this.decorText.setVisible(true);
    this.enemyText.setVisible(true);
    this.recIndicator.setVisible(true);
    this.mapContainer.forEach((el) => el.setVisible(true));

    // Default to first camera if none selected
    if (!this.currentCameraId) {
      this.switchCamera(this.rooms[0].id);
    } else {
      this.switchCamera(this.currentCameraId);
    }
  }

  /** Close the camera monitor. */
  close() {
    this.isOpen = false;
    this.overlay.setVisible(false);
    this.static.setVisible(false);
    this.cameraLabel.setVisible(false);
    this.roomDescription.setVisible(false);
    this.decorText.setVisible(false);
    this.enemyText.setVisible(false);
    this.recIndicator.setVisible(false);
    this.mapContainer.forEach((el) => el.setVisible(false));
  }

  /** Switch to a specific camera feed. */
  switchCamera(roomId) {
    this.currentCameraId = roomId;
    const room = this.rooms.find((r) => r.id === roomId);
    if (room) {
      this.cameraLabel.setText(room.name);
      this.roomDescription.setText(room.description || '');
      this.decorText.setText((room.decor || []).join('\n'));
    }

    // Play static switch sound
    this.scene.sound.play('camera_switch');

    // Update map highlights
    for (const [id, node] of Object.entries(this.mapNodes)) {
      if (id === roomId) {
        node.bg.setFillStyle(0x00ff00);
        node.bg.setRadius(8);
        node.label.setColor('#ffff00');
        node.label.setFontSize('11px');
      } else {
        node.bg.setFillStyle(0x003300);
        node.bg.setRadius(5);
        node.label.setColor('#00aa00');
        node.label.setFontSize('9px');
      }
    }

    // Flash the static briefly
    this.static.setFillStyle(0x333333);
    this.scene.time.delayedCall(80, () => {
      this.static.setFillStyle(0x111111);
    });
  }

  /** Cycle to the previous camera. */
  cycleCameraPrev() {
    const idx = this.rooms.findIndex((r) => r.id === this.currentCameraId);
    const prevIdx = (idx - 1 + this.rooms.length) % this.rooms.length;
    this.switchCamera(this.rooms[prevIdx].id);
  }

  /** Cycle to the next camera. */
  cycleCameraNext() {
    const idx = this.rooms.findIndex((r) => r.id === this.currentCameraId);
    const nextIdx = (idx + 1) % this.rooms.length;
    this.switchCamera(this.rooms[nextIdx].id);
  }

  /**
   * Update enemy display on the current camera feed only.
   * Map does NOT reveal enemy locations.
   * @param {Enemy[]} enemies
   */
  updateEnemyDisplay(enemies) {
    if (!this.isOpen || !this.currentCameraId) return;

    // Update camera feed text — only for the room being viewed
    const present = enemies.filter((e) => e.currentRoom === this.currentCameraId && !e.atDoor);
    if (present.length > 0) {
      const lines = present.map((e) => `${e.emoji}  ${e.name} is here!`);
      this.enemyText.setText(lines.join('\n'));
      this.enemyText.setColor('#ff2222');
    } else {
      this.enemyText.setText('— room clear —');
      this.enemyText.setColor('#336633');
    }
  }
}
