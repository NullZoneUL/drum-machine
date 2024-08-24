export class AudioManager {
  private audioContext: AudioContext;
  private sound: AudioBuffer;

  constructor(sound: string | File) {
    this.audioContext = new AudioContext();

    if (typeof sound !== 'string') {
      sound.arrayBuffer().then(async (arrayBuffer: ArrayBuffer) => {
        this.sound = await this.audioContext.decodeAudioData(arrayBuffer);
      });
      return;
    }

    fetch(sound).then(async (response: Response) => {
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      this.sound = audioBuffer;
    });
  }

  playSound() {
    if (!this.sound) return;

    const source = this.audioContext.createBufferSource();
    source.buffer = this.sound;
    source.connect(this.audioContext.destination);
    source.start(0);
  }
}
