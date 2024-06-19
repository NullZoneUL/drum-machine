import {
  subscribeEvent,
  unsubscribeEvent,
  CustomEventNames,
} from '@/utils/event';
import { SUBTICKS_BY_TICK } from '@/utils/default_values';

const QUARTER_TICK = 4 * SUBTICKS_BY_TICK;

export const playMetronome = () => {
  subscribeEvent(CustomEventNames.generalTick, tickListener);
};

export const stopMetronome = () => {
  unsubscribeEvent(CustomEventNames.generalTick, tickListener);
};

const tickListener = (event: CustomEvent) => {
  const tickNumber: number = event.detail;

  if (tickNumber % QUARTER_TICK === 0) {
    console.log('Tick');
  }
};
