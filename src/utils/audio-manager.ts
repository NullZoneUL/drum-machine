export class AudioManager {
  private audioContext: AudioContext;
  private sound: AudioBuffer | undefined;

  constructor(sound: string | File, errorCallback: () => void) {
    this.audioContext = new AudioContext();

    if (typeof sound !== 'string') {
      sound.arrayBuffer().then(async (arrayBuffer: ArrayBuffer) => {
        try {
          this.sound = await this.audioContext.decodeAudioData(arrayBuffer);
        } catch (e) {
          errorCallback();
          return;
        }
      });
      return;
    }

    fetch(sound).then(async (response: Response) => {
      const arrayBuffer = await response.arrayBuffer();
      let audioBuffer: AudioBuffer;

      try {
        audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      } catch (e) {
        errorCallback();
        return;
      }
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
