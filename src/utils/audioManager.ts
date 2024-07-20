export class AudioManager {
  private audioContext: AudioContext;
  private sound: AudioBuffer;

  constructor() {
    this.audioContext = new AudioContext();
  }

  async loadSound(url: string) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
    this.sound = audioBuffer;
  }

  playSound() {
    if (!this.sound) return;

    const source = this.audioContext.createBufferSource();
    source.buffer = this.sound;
    source.connect(this.audioContext.destination);
    source.start(0);
  }
}
