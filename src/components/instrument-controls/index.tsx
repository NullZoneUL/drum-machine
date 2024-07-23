import React, { useCallback, useEffect, useRef, useState } from 'react';
import InstrumentSelectorContainer from './instrument-selector';
import ButtonRollContainer from './button-roll-section';
import InstrumentPagesContainer from './instrument-pages';
import {
  subscribeEvent,
  unsubscribeEvent,
  CustomEventNames,
} from '@utils/event';
import './style.scss';

const InstrumentControlsContainer = () => {
  const [tick, setNewTick] = useState(-1);
  const [selectedPage, setSelectedPage] = useState(1);
  const [limitTicks, setLimitTicks] = useState(0);
  const limitTicksRef = useRef(limitTicks);

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
    limitTicksRef.current = numTicks - 1;
    setLimitTicks(limitTicksRef.current);
  }, []);

  return (
    <div className="instrument-controls-container">
      <InstrumentSelectorContainer />
      <ButtonRollContainer
        selectedPage={selectedPage}
        limitTicks={limitTicks}
        tick={tick}
      />
      <InstrumentPagesContainer
        setTicksByLoop={setTicksByLoop}
        setSelectedPage={setSelectedPage}
      />
    </div>
  );
};

export default InstrumentControlsContainer;
