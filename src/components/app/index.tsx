import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import MainControlsContainer from '@components/main-controls';
import InstrumentControlsContainer from '@components/instrument-controls';
import { InstrumentManager } from '@utils/instrument';
import { useTicksPagesListener } from '@hooks/ticks-pages';
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
          manager: new InstrumentManager(instrument, maxTicksRef.current),
        },
      ]);
    },
    [maxTicksValue],
  );

  const deleteInstrument = useCallback((index: number) => {
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
    </InstrumentsContext.Provider>
  );
};

export default App;
