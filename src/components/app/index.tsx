import MainControlsContainer from '@components/main-controls';
import InstrumentControlsContainer from '@components/instrument-controls';
import ModalService from '@elements/modal-service';
import SimpleMessageModal from '@elements/modal-service/modals/simple-message';
import Translation from '@assets/literals/literals';
import { createContext, useCallback, useEffect, useRef, useState } from 'react';
import { InstrumentManager } from '@utils/instrument';
import { useTicksPagesListener } from '@hooks/ticks-pages';
import { publishEvent, CustomEventNames } from '@utils/event';
import './style.scss';

export const InstrumentsContext = createContext<{
  instruments: Instrument[];
  addInstrument: (instrument: File) => void;
  deleteInstrument: (index: number) => void;
}>({
  instruments: [],
  addInstrument: () => {
    /**/
  },
  deleteInstrument: () => {
    /**/
  },
});

const App = () => {
  const { maxTicksValue } = useTicksPagesListener();
  const [instruments, setInstrument] = useState<Instrument[]>([]);
  const instrumentsRef = useRef(instruments);
  const maxTicksRef = useRef(maxTicksValue);

  useEffect(() => {
    instrumentsRef.current = instruments;
  }, [instruments]);

  useEffect(() => {
    maxTicksRef.current = maxTicksValue - 1;
  }, [maxTicksValue]);

  useEffect(() => {
    console.log('Loaded!!');
  }, []);

  const addInstrument = useCallback(
    (instrument: File) => {
      setInstrument([
        ...instrumentsRef.current,
        {
          file: instrument,
          numTicks: maxTicksRef.current,
          manager: new InstrumentManager(
            instrument,
            maxTicksRef.current,
            () => {
              //Delete the current audio if there is any error when trying to load it
              publishEvent(
                CustomEventNames.newModalEvent,
                <SimpleMessageModal
                  message={Translation.messages.errors.file_load}
                />,
              );
              deleteInstrument(instrumentsRef.current.length - 1);
            },
          ),
        },
      ]);
    },
    [maxTicksValue],
  );

  const deleteInstrument = useCallback((index: number) => {
    instrumentsRef.current[index].manager.cleanup();

    const newInstrumentsArray = [...instrumentsRef.current];
    newInstrumentsArray.splice(index, 1);
    setInstrument(newInstrumentsArray);
  }, []);

  return (
    <InstrumentsContext.Provider
      value={{ instruments, addInstrument, deleteInstrument }}
    >
      <div className="drum-machine-container">
        <MainControlsContainer />
        <InstrumentControlsContainer />
      </div>
      <ModalService />
    </InstrumentsContext.Provider>
  );
};

export default App;
