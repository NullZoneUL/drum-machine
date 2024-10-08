import { AudioManager } from '@utils/audio-manager';
import {
  subscribeEvent,
  unsubscribeEvent,
  CustomEventNames,
} from '@utils/event';
import {
  SUBTICKS_BY_TICK,
  SYSTEM_MAX_TICKS,
  GENERAL_MAX_TICKS,
  TICKS_BY_PAGE,
} from './default_values';

const createNewTickPositionsMap = (maxTicks: number) => {
  const tickPositions = new Map<number, boolean>();

  for (let i = 0; i < maxTicks; i++) {
    tickPositions.set(i, false);
  }

  return tickPositions;
};

export class InstrumentManager {
  #tickPositions: Map<number, boolean>;
  #generalTickPositions: Map<number, boolean>;
  #audioManager: AudioManager;
  #maxNumTicks = 0;
  #tick = 0;

  constructor(file: File, numTicks: number, onErrorCallback: () => void) {
    this.setNewMaxNumTicks(numTicks);
    this.#tickPositions = createNewTickPositionsMap(SYSTEM_MAX_TICKS);
    this.#generalTickPositions = createNewTickPositionsMap(GENERAL_MAX_TICKS);
    this.#audioManager = new AudioManager(file, onErrorCallback);

    this.tickListener = this.tickListener.bind(this);
    subscribeEvent(CustomEventNames.systemTick, this.tickListener);
  }

  tickListener(data: CustomEvent<number>) {
    const tickNumber = data.detail;
    if (tickNumber === 0 || this.#tick >= this.#maxNumTicks) {
      this.#tick = 0;
    } else {
      this.#tick++;
    }

    if (this.#tickPositions.get(this.#tick)) {
      this.#audioManager.playSound();
    }
  }

  setNewMaxNumTicks(numTicks: number) {
    this.#maxNumTicks = (numTicks + 1) * SUBTICKS_BY_TICK - 1;
  }

  updateTickPosition(position: number) {
    const actualValue = this.#generalTickPositions.get(position);

    if (actualValue !== undefined) {
      this.#generalTickPositions.set(position, !actualValue);
      this.#tickPositions.set(position * SUBTICKS_BY_TICK, !actualValue);
      return !actualValue;
    }

    return null;
  }

  getGeneralTicksPage(page: number) {
    const ticksByPage = [];
    for (let i = (page - 1) * TICKS_BY_PAGE; i < page * TICKS_BY_PAGE; i++) {
      ticksByPage.push(this.#generalTickPositions.get(i));
    }
    return ticksByPage;
  }

  cleanup() {
    unsubscribeEvent(CustomEventNames.systemTick, this.tickListener);
  }
}
