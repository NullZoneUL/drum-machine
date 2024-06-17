import { bpmValues, DEFAULT_MAIN_PAGES, TICKS_BY_PAGE } from './default_values';

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
    if (tickNumber % 5 === 0) {
      if (tickNumber === ticksByLoop) {
        tickNumber = 0;
      }
      console.log('General tick event: ', tickNumber);
    }
    console.log('Tick: ', tickNumber);

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
  const sectionTime = quaverTime / 5;
  return sectionTime;
};

const getTicksByLoop = () => {
  const totalQuaverTicks = pages * TICKS_BY_PAGE;
  const totalTicksBySection = totalQuaverTicks * 5;
  return totalTicksBySection;
};

timeByTick = getTimeByTick();
ticksByLoop = getTicksByLoop();
