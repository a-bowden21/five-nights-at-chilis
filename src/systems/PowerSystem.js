/**
 * Tracks remaining power and drain rates.
 */
export class PowerSystem {
  constructor(scene, drainRate = 1.0) {
    this.scene = scene;
    this.power = 100;
    this.drainRate = drainRate;
    this.baseDrain = 0.15;   // power lost per second at idle
    this.cameraDrain = 0.25; // extra drain when cameras are open
    this.doorDrain = 0.35;   // extra drain per closed door

    // HUD
    this.powerText = scene.add.text(20, 20, 'Power: 100%', {
      fontFamily: 'Courier New',
      fontSize: '22px',
      color: '#00ff00',
    }).setDepth(200);

    this.powerBar = scene.add.rectangle(130, 50, 200, 14, 0x00ff00)
      .setOrigin(0, 0.5)
      .setDepth(200);
    this.powerBarBg = scene.add.rectangle(130, 50, 200, 14, 0x333333)
      .setOrigin(0, 0.5)
      .setDepth(199);
  }

  /**
   * @param {number} delta — ms
   * @param {boolean} camerasOpen
   * @param {boolean} leftDoorClosed
   * @param {boolean} rightDoorClosed
   */
  update(delta, camerasOpen, leftDoorClosed, rightDoorClosed) {
    const seconds = delta / 1000;
    let drain = this.baseDrain;

    if (camerasOpen) drain += this.cameraDrain;
    if (leftDoorClosed) drain += this.doorDrain;
    if (rightDoorClosed) drain += this.doorDrain;

    this.power -= drain * this.drainRate * seconds;
    if (this.power < 0) this.power = 0;

    // Update HUD
    const pct = Math.ceil(this.power);
    this.powerText.setText(`Power: ${pct}%`);
    this.powerBar.width = (this.power / 100) * 200;

    if (this.power <= 20) {
      this.powerText.setColor('#ff4444');
      this.powerBar.setFillStyle(0xff4444);
    } else if (this.power <= 50) {
      this.powerText.setColor('#ffcc00');
      this.powerBar.setFillStyle(0xffcc00);
    } else {
      this.powerText.setColor('#00ff00');
      this.powerBar.setFillStyle(0x00ff00);
    }
  }

  isOut() {
    return this.power <= 0;
  }
}

