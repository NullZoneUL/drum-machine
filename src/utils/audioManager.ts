export class AudioManager {
  private audioContext: AudioContext;
  private sound: AudioBuffer;

  constructor(url: string) {
    this.audioContext = new AudioContext();

    fetch(url).then(async (response: Response) => {
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
