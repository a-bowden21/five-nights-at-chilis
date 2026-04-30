/**
 * Procedural sound effects for Five Nights at Chili's.
 * Generates WAV audio data and loads it through Phaser's sound system.
 */
export class SoundManager {
  /**
   * Generate all sounds as WAV blobs and load them into a Phaser scene.
   * Call this in preload().
   * @param {Phaser.Scene} scene
   */
  static preload(scene) {
    const rate = 44100;

    scene.load.audio('door_close', SoundManager._makeWavURL(rate, SoundManager._genDoorClose(rate)));
    scene.load.audio('door_open', SoundManager._makeWavURL(rate, SoundManager._genDoorOpen(rate)));
    scene.load.audio('camera_open', SoundManager._makeWavURL(rate, SoundManager._genCameraOpen(rate)));
    scene.load.audio('camera_close', SoundManager._makeWavURL(rate, SoundManager._genCameraClose(rate)));
    scene.load.audio('camera_switch', SoundManager._makeWavURL(rate, SoundManager._genCameraSwitch(rate)));
    scene.load.audio('jumpscare', SoundManager._makeWavURL(rate, SoundManager._genJumpscare(rate)));
  }

  // ---- Sound generators (return Float32Array of samples) ----

  /** Heavy metal door slamming shut — resonant impact + rattling. */
  static _genDoorClose(rate) {
    const dur = 0.6;
    const len = Math.floor(rate * dur);
    const out = new Float32Array(len);
    for (let i = 0; i < len; i++) {
      const t = i / rate;
      // Sharp attack envelope
      const attack = Math.min(1, t / 0.005);
      const decay = Math.max(0, 1 - t / dur);
      const env = attack * decay;
      // Heavy bass impact — drops from 120Hz to 30Hz
      const bassFreq = 120 * Math.pow(0.25, t / 0.3);
      const bass = Math.sin(2 * Math.PI * bassFreq * t) * 0.7 * env * env;
      // Metal resonance — multiple ring frequencies like a steel door
      const ring1 = Math.sin(2 * Math.PI * 340 * t) * 0.25 * Math.exp(-t * 8);
      const ring2 = Math.sin(2 * Math.PI * 570 * t) * 0.15 * Math.exp(-t * 12);
      const ring3 = Math.sin(2 * Math.PI * 890 * t) * 0.10 * Math.exp(-t * 16);
      // Initial impact burst — sharp transient
      const impact = (Math.random() * 2 - 1) * 0.5 * Math.exp(-t * 40);
      // Rattle/vibration tail
      const rattle = Math.sin(2 * Math.PI * 180 * t + 3 * Math.sin(2 * Math.PI * 30 * t))
        * 0.12 * Math.max(0, decay - 0.3) * decay;
      out[i] = Math.max(-1, Math.min(1, bass + ring1 + ring2 + ring3 + impact + rattle));
    }
    return out;
  }

  /** Metal door sliding/lifting open — scraping + mechanical release. */
  static _genDoorOpen(rate) {
    const dur = 0.5;
    const len = Math.floor(rate * dur);
    const out = new Float32Array(len);
    for (let i = 0; i < len; i++) {
      const t = i / rate;
      const env = Math.max(0, 1 - t / dur);
      // Mechanical clunk at start
      const clunk = Math.sin(2 * Math.PI * 90 * t) * 0.4 * Math.exp(-t * 20);
      // Metal scraping — rising filtered noise
      const scrapeEnv = Math.min(1, t / 0.05) * Math.max(0, 1 - (t - 0.3) / 0.2);
      const scrapeFreq = 200 + 400 * (t / dur);
      const scrape = Math.sin(2 * Math.PI * scrapeFreq * t + 2 * Math.sin(2 * Math.PI * 60 * t))
        * 0.2 * scrapeEnv;
      // Metallic friction noise
      const friction = (Math.random() * 2 - 1) * 0.18 * scrapeEnv;
      // Spring/hydraulic release sound
      const spring = Math.sin(2 * Math.PI * (150 + 200 * t / dur) * t) * 0.1 * env;
      // Small ring at end
      const endRing = Math.sin(2 * Math.PI * 420 * t) * 0.08 * Math.max(0, t - 0.35) / 0.15 * Math.exp(-(t - 0.35) * 15);
      out[i] = Math.max(-1, Math.min(1, clunk + scrape + friction + spring + (t > 0.35 ? endRing : 0)));
    }
    return out;
  }

  /** Camera tablet pulling up — electronic hum + servo + click. */
  static _genCameraOpen(rate) {
    const dur = 0.4;
    const len = Math.floor(rate * dur);
    const out = new Float32Array(len);
    for (let i = 0; i < len; i++) {
      const t = i / rate;
      const env = Math.max(0, 1 - t / dur);
      // Servo motor whine — rising pitch
      const servoFreq = 300 + 1200 * Math.pow(t / dur, 0.7);
      const servo = Math.sin(2 * Math.PI * servoFreq * t) * 0.08 * env;
      // Electronic hum
      const hum = Math.sin(2 * Math.PI * 120 * t) * 0.06 * Math.min(1, t / 0.1) * env;
      // Initial clicky beep
      const beep = Math.sin(2 * Math.PI * 1200 * t) * 0.25 * Math.exp(-t * 30);
      // CRT power-on buzz
      const buzz = (Math.sign(Math.sin(2 * Math.PI * 180 * t)) * 0.05 +
        Math.sin(2 * Math.PI * 60 * t) * 0.04) * Math.min(1, t / 0.15) * env;
      // Static crackle fading in
      const staticNoise = (Math.random() * 2 - 1) * 0.15 * Math.min(1, t / 0.1) * env;
      out[i] = Math.max(-1, Math.min(1, servo + hum + beep + buzz + staticNoise));
    }
    return out;
  }

  /** Camera putting down — reverse servo + power-down + click. */
  static _genCameraClose(rate) {
    const dur = 0.3;
    const len = Math.floor(rate * dur);
    const out = new Float32Array(len);
    for (let i = 0; i < len; i++) {
      const t = i / rate;
      const env = Math.max(0, 1 - t / dur);
      // Servo winding down
      const servoFreq = 1000 - 800 * (t / dur);
      const servo = Math.sin(2 * Math.PI * servoFreq * t) * 0.08 * env;
      // Power-down tone
      const powerDown = Math.sin(2 * Math.PI * (400 - 350 * t / dur) * t) * 0.1 * env * env;
      // Click at start
      const click = Math.sin(2 * Math.PI * 800 * t) * 0.25 * Math.exp(-t * 40);
      // Static cutting out
      const staticNoise = (Math.random() * 2 - 1) * 0.12 * env * env;
      out[i] = Math.max(-1, Math.min(1, servo + powerDown + click + staticNoise));
    }
    return out;
  }

  /** Camera switching — short static burst like changing channels. */
  static _genCameraSwitch(rate) {
    const dur = 0.2;
    const len = Math.floor(rate * dur);
    const out = new Float32Array(len);
    for (let i = 0; i < len; i++) {
      const t = i / rate;
      // Sharp attack, quick decay
      const env = Math.exp(-t * 15);
      // White noise (static)
      const staticNoise = (Math.random() * 2 - 1) * 0.4 * env;
      // Quick electronic blip
      const blip = Math.sin(2 * Math.PI * 800 * t) * 0.1 * Math.exp(-t * 50);
      // Crackling texture
      const crackle = (Math.random() > 0.92 ? (Math.random() * 2 - 1) * 0.3 : 0) * env;
      out[i] = Math.max(-1, Math.min(1, staticNoise + blip + crackle));
    }
    return out;
  }

  static _genJumpscare(rate) {
    const dur = 1.2;
    const len = Math.floor(rate * dur);
    const out = new Float32Array(len);
    for (let i = 0; i < len; i++) {
      const t = i / rate;
      const env = Math.max(0, 1 - t / dur);
      // Screech 1 — wild pitch modulation
      const freq1 = 800 + 600 * Math.sin(t * 20) + 400 * Math.sin(t * 7);
      const screech1 = (((2 * Math.PI * freq1 * t) % (2 * Math.PI)) / Math.PI - 1) * 0.5 * env;
      // Screech 2 — dissonant square-ish
      const freq2 = 1300 + 500 * Math.sin(t * 13);
      const screech2 = Math.sign(Math.sin(2 * Math.PI * freq2 * t)) * 0.3 * env;
      // Deep bass hit
      const bassFreq = 60 * Math.pow(0.2, t / dur);
      const bass = Math.sin(2 * Math.PI * bassFreq * t) * 0.6 * Math.max(0, 1 - t / 0.5);
      // Noise blast
      const noise = (Math.random() * 2 - 1) * 0.4 * env;
      out[i] = Math.max(-1, Math.min(1, screech1 + screech2 + bass + noise));
    }
    return out;
  }

  // ---- WAV encoding ----

  /**
   * Encode Float32Array samples into a WAV data URL.
   */
  static _makeWavURL(sampleRate, samples) {
    const numSamples = samples.length;
    const buffer = new ArrayBuffer(44 + numSamples * 2);
    const view = new DataView(buffer);

    // WAV header
    const writeStr = (offset, str) => {
      for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
    };
    writeStr(0, 'RIFF');
    view.setUint32(4, 36 + numSamples * 2, true);
    writeStr(8, 'WAVE');
    writeStr(12, 'fmt ');
    view.setUint32(16, 16, true);          // chunk size
    view.setUint16(20, 1, true);           // PCM
    view.setUint16(22, 1, true);           // mono
    view.setUint32(24, sampleRate, true);   // sample rate
    view.setUint32(28, sampleRate * 2, true); // byte rate
    view.setUint16(32, 2, true);           // block align
    view.setUint16(34, 16, true);          // bits per sample
    writeStr(36, 'data');
    view.setUint32(40, numSamples * 2, true);

    // Write samples as 16-bit PCM
    for (let i = 0; i < numSamples; i++) {
      const s = Math.max(-1, Math.min(1, samples[i]));
      view.setInt16(44 + i * 2, s * 32767, true);
    }

    const blob = new Blob([buffer], { type: 'audio/wav' });
    return URL.createObjectURL(blob);
  }
}

/** Singleton — holds nothing, all methods are static. */
export const soundManager = new SoundManager();

