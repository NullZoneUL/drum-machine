import InstrumentSelectorContainer from './instrument-selector';
import ButtonRollContainer from './button-roll-section';
import InstrumentPagesContainer from './instrument-pages';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
  subscribeEvent,
  unsubscribeEvent,
  CustomEventNames,
} from '@utils/event';
import { InstrumentsContext } from '@components/app';
import './style.scss';

const InstrumentControlsContainer = () => {
  const { instruments } = useContext(InstrumentsContext);
  const [tick, setNewTick] = useState(-1);
  const [selectedPage, setSelectedPage] = useState(1);
  const [selectedInstrument, setSelectedInstrument] = useState(0);
  const [limitTicks, setLimitTicks] = useState(0);
  const limitTicksRef = useRef(limitTicks);

  useEffect(() => {
    const selectedInstrument_ = instruments[selectedInstrument];
    setLimitTicks(selectedInstrument_ ? selectedInstrument_.numTicks : 0);
  }, [selectedInstrument]);

  useEffect(() => {
    instruments.length === 0 && setLimitTicks(0);
  }, [instruments]);

  useEffect(() => {
    limitTicksRef.current = limitTicks;

    const selectedInstrument_ = instruments[selectedInstrument];
    if (selectedInstrument_) {
      selectedInstrument_.numTicks = limitTicks;
      selectedInstrument_.manager.setNewMaxNumTicks(limitTicks);
    }
  }, [limitTicks]);

  useEffect(() => {
    const eventListener = (data: { detail: { tick: number } }) => {
      const generalTick = data.detail.tick;
      setNewTick(tick => {
        if (generalTick === 0 || tick >= limitTicksRef.current) {
          return 0;
        }
        return tick + 1;
      });
    };
    subscribeEvent(CustomEventNames.generalTick, eventListener);

    return () => {
      unsubscribeEvent(CustomEventNames.generalTick, eventListener);
    };
  }, []);

  const setTicksByLoop = useCallback((numTicks: number) => {
    setLimitTicks(numTicks - 1);
  }, []);

  return (
    <div className="instrument-controls-container">
      <InstrumentSelectorContainer
        setSelectedInstrument={setSelectedInstrument}
        selectedInstrument={selectedInstrument}
      />
      <ButtonRollContainer
        selectedPage={selectedPage}
        limitTicks={limitTicks}
        tick={tick}
        instruments={instruments}
        selectedInstrument={selectedInstrument}
      />
      {instruments.length > 0 && (
        <InstrumentPagesContainer
          setTicksByLoop={setTicksByLoop}
          setSelectedPage={setSelectedPage}
          instrument={instruments[selectedInstrument]}
        />
      )}
    </div>
  );
};

export default InstrumentControlsContainer;
