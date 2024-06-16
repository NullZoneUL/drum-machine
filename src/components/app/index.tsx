import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import MainControlsContainer from '@components/main-controls';
import InstrumentControlsContainer from '@components/instrument-controls';
import './style.scss';

export const InstrumentsContext = createContext<{
  instruments: File[];
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
  const [instruments, setInstrument] = useState<File[]>([]);
  const instrumentsRef = useRef(instruments);

  useEffect(() => {
    instrumentsRef.current = instruments;
  }, [instruments]);

  useEffect(() => {
    console.log('Loaded!!');
  }, []);

  const addInstrument = useCallback((instrument: File) => {
    setInstrument([...instrumentsRef.current, instrument]);
  }, []);

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
