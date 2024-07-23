import metronomeSound from '@assets/sounds/metronome-tick.mp3';
import { subscribeEvent, CustomEventNames } from '@utils/event';
import { QUARTER_TICK } from '@utils/default_values';
import { AudioManager } from '@utils/audio-manager';

let playing = false;
let preventDoubleSound = true;

const audioManager = new AudioManager(metronomeSound);

//TODO!!! Connect metronome volume with master volume param

export const playMetronome = () => {
  preventDoubleSound = true;
  playing = true;
};

export const stopMetronome = () => {
  playing = false;
};

const tickListener = (event: CustomEvent<{ tick: number; play: boolean }>) => {
  if (!playing || !event.detail.play) {
    return;
  }

  const tickNumber: number = event.detail.tick;

  if (tickNumber % QUARTER_TICK === 0) {
    //If we start playing the sound by the first tick, it will sound twice, so we prevent the first tick to play
    if (preventDoubleSound) {
      preventDoubleSound = false;
      return;
    }

    audioManager.playSound();
  }
};

subscribeEvent(CustomEventNames.generalTick, tickListener);
