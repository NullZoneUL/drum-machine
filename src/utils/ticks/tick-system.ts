import tickWorkerURL from './tick-worker';
import {
  bpmValues,
  DEFAULT_MAIN_PAGES,
  TICKS_BY_PAGE,
  SUBTICKS_BY_TICK,
} from '../default_values';
import { invoke } from '@tauri-apps/api/tauri';
import { listen } from '@tauri-apps/api/event';
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
  onPause(true);
  playerState = PlayerStates.PLAYING;
  tickWorker.postMessage({
    action: playerState,
    timeByTick,
    ticksByLoop,
  });
  invoke('playing_state', {
    tickInterval: timeByTick,
    ticksByLoop,
  });
};

export const onPause = (skipRustCall = false) => {
  playerState = PlayerStates.PAUSED;
  tickWorker.postMessage({
    action: playerState,
    timeByTick,
    ticksByLoop,
  });
  !skipRustCall && invoke('paused_state');
};

export const onStop = () => {
  onPause(true);
  playerState = PlayerStates.STOPPED;
  tickWorker.postMessage({
    action: playerState,
    timeByTick,
    ticksByLoop,
  });
  invoke('stopped_state');
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
    /*case 'generalTick': // TODO!!! Delete this part once tick-worker.ts is completely removed
      publishEvent(CustomEventNames.generalTick, {
        tick: eventData.number,
        play: eventData.play,
      });
      break;*/
    case 'systemTick':
      publishEvent(CustomEventNames.systemTick, eventData.number);
      break;
  }
};

listen(
  'general-tick-event',
  (event: { payload: { tick: number; play: boolean } }) => {
    const { tick, play } = event.payload;
    publishEvent(CustomEventNames.generalTick, {
      tick,
      play,
    });
  },
);

timeByTick = getTimeByTick();
ticksByLoop = getTicksByLoop();
