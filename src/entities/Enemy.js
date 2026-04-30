import Phaser from 'phaser';

/**
 * Enemy entity — tracks an enemy's position and handles move logic.
 */
export class Enemy {
  /**
   * @param {object} config — from nights.js enemy entry
   */
  constructor(config) {
    this.id = config.id;
    this.name = config.name;
    this.emoji = config.emoji || '👾';
    this.aggression = config.aggression;
    this.path = config.path;             // ordered list of room ids toward office
    this.moveInterval = config.moveInterval * 1000; // convert to ms
    this.currentRoom = config.startRoom;
    this.pathIndex = 0;
    this.timeSinceLastMove = 0;
    this.atDoor = false;                 // true when they've passed the last room
  }

  /**
   * Called every frame. Accumulates time, then rolls to move.
   * @param {number} delta — ms since last frame
   */
  update(delta) {
    if (this.atDoor) return; // already at the office

    this.timeSinceLastMove += delta;

    if (this.timeSinceLastMove >= this.moveInterval) {
      this.timeSinceLastMove = 0;
      this.tryMove();
    }
  }

  /** Roll against aggression to decide whether to advance along path. */
  tryMove() {
    const roll = Phaser.Math.Between(1, 20);
    if (roll <= this.aggression) {
      this.advance();
    }
  }

  /** Move to the next room in the path. */
  advance() {
    if (this.pathIndex < this.path.length - 1) {
      this.pathIndex++;
      this.currentRoom = this.path[this.pathIndex];
    } else {
      // Past the last camera room → at the office door
      this.atDoor = true;
    }
  }

  /** Send enemy back to start (e.g. after being blocked by a closed door). */
  reset() {
    this.pathIndex = 0;
    this.currentRoom = this.path[0];
    this.atDoor = false;
    this.timeSinceLastMove = 0;
  }
}
