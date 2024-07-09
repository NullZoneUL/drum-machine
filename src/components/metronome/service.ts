import metronomeSound from '@assets/sounds/metronome-tick.mp3';
import { subscribeEvent, CustomEventNames } from '@/utils/event';
import { SUBTICKS_BY_TICK } from '@/utils/default_values';

const QUARTER_TICK = 4 * SUBTICKS_BY_TICK;

let playing = false;
let preventDoubleSound = true;

//TODO!!! Connect metronome volume with master volume param

export const playMetronome = () => {
  preventDoubleSound = true;
  playing = true;
};

export const stopMetronome = () => {
  playing = false;
};

const tickListener = (event: CustomEvent) => {
  if (!playing) {
    return;
  }

  const tickNumber: number = event.detail;

  if (tickNumber % QUARTER_TICK === 0) {
    const audio = new Audio(metronomeSound);

    //If we start playing the sound by the first tick, it will sound twice, so we prevent the first tick to play
    if (preventDoubleSound) {
      preventDoubleSound = false;
      return;
    }

    audio.play();
  }
};

subscribeEvent(CustomEventNames.generalTick, tickListener);
