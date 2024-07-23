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

export const setNewBPMs = (newValue: number) => {
  if (newValue >= bpmValues.min && newValue <= bpmValues.max) {
    bpm = newValue;
    timeByTick = getTimeByTick();
    playerState === PlayerStates.PLAYING && onPlay();
  }
};

export const setNumPages = (num: number) => {
  pages = num;
  ticksByLoop = getTicksByLoop();
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

const getTicksByLoop = () => {
  const totalQuaverTicks = pages * TICKS_BY_PAGE;
  const totalTicksBySection = totalQuaverTicks * SUBTICKS_BY_TICK;
  return totalTicksBySection;
};

tickWorker.onmessage = (
  event: MessageEvent<{ type: string; number: number; play?: boolean }>,
) => {
  const eventData = event.data;
  switch (eventData.type) {
    case 'generalTick':
      publishEvent(CustomEventNames.generalTick, {
        tick: eventData.number,
        play: eventData.play,
      });
      break;
    case 'systemTick':
      publishEvent(CustomEventNames.systemTick, eventData.number);
      break;
  }
};

timeByTick = getTimeByTick();
ticksByLoop = getTicksByLoop();
