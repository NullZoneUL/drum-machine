import { PlayerStates } from '@components/main-controls';

interface TickWorkerMessageProps {
  action: PlayerStates;
  timeByTick: number;
  ticksByLoop: number;
}

const tickWorker = () => {
  const SUBTICKS_BY_TICK = 5;
  let tickNumber = 0;
  let tickInterval: any;

  self.onmessage = (event: MessageEvent<TickWorkerMessageProps>) => {
    const eventData = event.data;
    switch (eventData.action) {
      case 0: //Playing
        tickInterval = setInterval(() => {
          if (tickNumber % SUBTICKS_BY_TICK === 0) {
            if (tickNumber === eventData.ticksByLoop) {
              tickNumber = 0;
            }
            self.postMessage({ type: 'generalTick', number: tickNumber });
          }
          self.postMessage({ type: 'systemTick', number: tickNumber });

          tickNumber++;
        }, eventData.timeByTick);
        break;
      case 1: //Paused
        clearInterval(tickInterval);
        break;
      case 2: //Stopped
        tickNumber = 0;
        break;
    }
  };
};

const codeToString = tickWorker.toString();
const mainCode = codeToString.substring(
  codeToString.indexOf('{') + 1,
  codeToString.lastIndexOf('}'),
);
const blob = new Blob([mainCode], { type: 'application/javascript' });
const tickWorkerURL = URL.createObjectURL(blob);

export default tickWorkerURL;
