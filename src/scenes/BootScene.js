import Phaser from 'phaser';
import { SoundManager } from '../systems/SoundManager.js';

/**
 * Boot scene — load assets, show loading bar.
 */
export class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    // Generate and load all procedural sound effects
    SoundManager.preload(this);
  }

  create() {
    this.scene.start('MenuScene');
  }
}
