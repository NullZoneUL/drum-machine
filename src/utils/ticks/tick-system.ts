import tickWorkerURL from './tick-worker';
import {
  bpmValues,
  DEFAULT_MAIN_PAGES,
  TICKS_BY_PAGE,
  SUBTICKS_BY_TICK,
} from '../default_values';
import { PlayerStates } from '@components/main-controls';
import { publishEvent, CustomEventNames } from '../event';

const tickWorker = new Worker(tickWorkerURL);

let bpm = bpmValues.default;
let pages = DEFAULT_MAIN_PAGES;
let timeByTick: number;
let ticksByLoop: number;
let playerState: PlayerStates;
let numTicksSelector: number;

export const setNewBPMs = (newValue: number) => {
  if (newValue >= bpmValues.min && newValue <= bpmValues.max) {
    bpm = newValue;
    timeByTick = getTimeByTick();
    playerState === PlayerStates.PLAYING && onPlay();
  }
};

export const setNumPages = (num: number) => {
  pages = num;
  ticksByLoop = getTicksByLoop(numTicksSelector);
  playerState === PlayerStates.PLAYING && onPlay();
};

export const setTicksByLoop = (numTicks: number) => {
  numTicksSelector = numTicks;
  ticksByLoop = getTicksByLoop(numTicks);
  playerState === PlayerStates.PLAYING && onPlay();
};

export const onPlay = () => {
  onPause();
  playerState = PlayerStates.PLAYING;
  tickWorker.postMessage({
    action: playerState,
    timeByTick,
    ticksByLoop,
  });
};

export const onPause = () => {
  playerState = PlayerStates.PAUSED;
  tickWorker.postMessage({
    action: playerState,
    timeByTick,
    ticksByLoop,
  });
};

export const onStop = () => {
  onPause();
  playerState = PlayerStates.STOPPED;
  tickWorker.postMessage({
    action: playerState,
    timeByTick,
    ticksByLoop,
  });
};

const getTimeByTick = () => {
  const quarterTime = 60000 / bpm;
  const quaverTime = quarterTime / 4;
  const sectionTime = quaverTime / SUBTICKS_BY_TICK;
  return sectionTime;
};

const getTicksByLoop = (numTicks?: number) => {
  const maxTicks = pages * TICKS_BY_PAGE;
  const totalQuaverTicks =
    typeof numTicks === 'number'
      ? numTicks <= maxTicks
        ? numTicks
        : maxTicks
      : maxTicks;
  const totalTicksBySection = totalQuaverTicks * SUBTICKS_BY_TICK;
  return totalTicksBySection;
};

tickWorker.onmessage = (
  event: MessageEvent<{ type: string; number: number }>,
) => {
  const eventData = event.data;
  switch (eventData.type) {
    case 'generalTick':
      publishEvent(CustomEventNames.generalTick, eventData.number);
      break;
    case 'systemTick':
      publishEvent(CustomEventNames.systemTick, eventData.number);
      break;
  }
};

timeByTick = getTimeByTick();
ticksByLoop = getTicksByLoop();
