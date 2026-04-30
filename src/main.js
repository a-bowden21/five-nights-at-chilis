import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene.js';
import { MenuScene } from './scenes/MenuScene.js';
import { GameScene } from './scenes/GameScene.js';
import { GameOverScene } from './scenes/GameOverScene.js';
import { WinScene } from './scenes/WinScene.js';

const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  backgroundColor: '#000000',
   parent: 'game-container',
  scene: [BootScene, MenuScene, GameScene, GameOverScene, WinScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

const game = new Phaser.Game(config);

