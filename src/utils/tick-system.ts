import {
  bpmValues,
  DEFAULT_MAIN_PAGES,
  TICKS_BY_PAGE,
  SUBTICKS_BY_TICK,
} from './default_values';
import { publishEvent, CustomEventNames } from './event';

let bpm = bpmValues.default;
let pages = DEFAULT_MAIN_PAGES;
let tickNumber = 0;
let timeByTick: number;
let tickInterval: number;
let ticksByLoop: number;

export const setNewBPMs = (newValue: number) => {
  if (newValue >= bpmValues.min && newValue <= bpmValues.max) {
    bpm = newValue;
    timeByTick = getTimeByTick();
  }
};

export const setNumPages = (num: number) => {
  pages = num;
  ticksByLoop = getTicksByLoop();
};

//TODO!!! Add event calls
export const onPlay = () => {
  const lastTimeByTick = timeByTick;
  onPause();

  tickInterval = window.setInterval(() => {
    if (tickNumber % SUBTICKS_BY_TICK === 0) {
      if (tickNumber === ticksByLoop) {
        tickNumber = 0;
      }
      publishEvent(CustomEventNames.generalTick, tickNumber);
    }
    publishEvent(CustomEventNames.systemTick, tickNumber);

    tickNumber++;

    if (timeByTick !== lastTimeByTick) {
      onPlay();
    }
  }, lastTimeByTick);
};

export const onPause = () => {
  window.clearInterval(tickInterval);
};

export const onStop = () => {
  onPause();
  tickNumber = 0;
  //TODO!!! Add reset event call
};

const getTimeByTick = () => {
  const quarterTime = 60000 / bpm;
  const quaverTime = quarterTime / 4;
  const sectionTime = quaverTime / SUBTICKS_BY_TICK;
  return sectionTime;
};

const getTicksByLoop = () => {
  const totalQuaverTicks = pages * TICKS_BY_PAGE;
  const totalTicksBySection = totalQuaverTicks * SUBTICKS_BY_TICK;
  return totalTicksBySection;
};

timeByTick = getTimeByTick();
ticksByLoop = getTicksByLoop();
