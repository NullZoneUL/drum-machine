import { bpmValues, DEFAULT_MAIN_PAGES, TICKS_BY_PAGE } from './default_values';

let bpm = bpmValues.default;
let pages = DEFAULT_MAIN_PAGES;
let timeByTick: number;
let tickInterval: number;

export const setNewBPMs = (newValue: number) => {
  if (newValue >= bpmValues.min && newValue <= bpmValues.max) {
    bpm = newValue;
    timeByTick = getTimeByTick();
  }
};

export const setNumPages = (num: number) => {
  pages = num;
};

export const onPlay = () => {
  const lastTimeByTick = timeByTick;
  onPause();
  tickInterval = window.setInterval(() => {
    console.log('Tick');
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
  //TODO!! Add stop behavior
};

const getTimeByTick = () => {
  const quarterTime = 60000 / bpm;
  const quaverTime = quarterTime / 4;
  const sectionTime = quaverTime / 4;
  return sectionTime;
};

timeByTick = getTimeByTick();
