/**
 * Manages the in-game clock (12 AM → 6 AM) and win condition.
 */
export class NightManager {
  /**
   * @param {Phaser.Scene} scene
   * @param {number} nightNumber — 1-based
   * @param {number} durationSeconds — real-time seconds for the whole night
   */
  constructor(scene, nightNumber, durationSeconds) {
    this.scene = scene;
    this.nightNumber = nightNumber;
    this.duration = durationSeconds * 1000; // ms
    this.elapsed = 0;
    this.hours = ['12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM'];

    // HUD — night label
    this.nightText = scene.add.text(1004, 20, `Night ${nightNumber}`, {
      fontFamily: 'Courier New',
      fontSize: '22px',
      color: '#ffffff',
    }).setOrigin(1, 0).setDepth(200);

    // HUD — clock
    this.clockText = scene.add.text(1004, 50, '12 AM', {
      fontFamily: 'Courier New',
      fontSize: '28px',
      color: '#ffffff',
    }).setOrigin(1, 0).setDepth(200);
  }

  /**
   * @param {number} delta ms
   * @returns {boolean} true if the night is over (6 AM reached)
   */
  update(delta) {
    this.elapsed += delta;

    // Figure out current hour (0-6)
    const progress = Math.min(this.elapsed / this.duration, 1);
    const hourIndex = Math.min(Math.floor(progress * 6), 6);
    this.clockText.setText(this.hours[hourIndex]);

    return progress >= 1;
  }
}

