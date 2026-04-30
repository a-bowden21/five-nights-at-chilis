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

    // Load the Tung Tung Sahur MP3 as the jumpscare sound (overrides procedural one)
    this.load.audio('jumpscare', '/sounds/tung-tung-sahur.mp3');
  }

  create() {
    this.scene.start('MenuScene');
  }
}
