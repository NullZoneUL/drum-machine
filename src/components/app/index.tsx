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
}>({
  instruments: [],
  addInstrument: () => {
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

  return (
    <InstrumentsContext.Provider value={{ instruments, addInstrument }}>
      <div className="drum-machine-container">
        <MainControlsContainer />
        <InstrumentControlsContainer />
      </div>
    </InstrumentsContext.Provider>
  );
};

export default App;
