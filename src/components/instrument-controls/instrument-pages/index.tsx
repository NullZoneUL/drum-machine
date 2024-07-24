import React, { useCallback, useEffect, useState } from 'react';
import NumSelector from '@elements/num-selector';
import ButtonText from '@elements/button-text';
import LightDotIndicatorContainer from '@elements/light-dot-indicator';
import Translation from '@assets/literals/literals';
import { MAX_PAGES } from '@utils/default_values';
import { useTicksPagesListener } from '@hooks/ticks-pages';
import './style.scss';

interface InstrumentPagesContainerProps {
  instrument: Instrument;
  setTicksByLoop: (numTicks: number) => void;
  setSelectedPage: (numPages: number) => void;
}

const InstrumentPagesContainer = ({
  instrument,
  setTicksByLoop,
  setSelectedPage,
}: InstrumentPagesContainerProps) => {
  //TODO!!! Implement tests...

  const { mainNumPages, maxTicksValue } = useTicksPagesListener();
  const [page, setPage] = useState(1);
  const [prevSelectedInstrument, setPrevSelectedInstrument] =
    useState(instrument);

  const onPageSelect = useCallback(() => {
    setPage(page => {
      if (page >= mainNumPages) {
        return 1;
      }

      return page + 1;
    });
  }, [mainNumPages]);

  useEffect(() => {
    if (page > mainNumPages) {
      setPage(mainNumPages);
    }
  }, [mainNumPages]);

  useEffect(() => {
    setPrevSelectedInstrument(instrument);
  }, [instrument]);

  useEffect(() => {
    setSelectedPage(page);
  }, [page]);

  if (prevSelectedInstrument?.file !== instrument?.file) {
    return <></>;
  }

  return (
    <div className="instrument-pages-container">
      <div className="instrument-pages-container-center">
        <div className="instrument-ticks-length">
          <NumSelector
            onChange={setTicksByLoop}
            minValue={1}
            maxValue={maxTicksValue}
            defaultValue={instrument.numTicks + 1}
          />
          <span>{maxTicksValue}</span>
        </div>
        <div className="instrument-pages-selector">
          <LightDotIndicatorContainer
            numLights={MAX_PAGES}
            selectedPage={page}
            maxNumPages={mainNumPages}
          />
          <ButtonText text={Translation.page} callback={onPageSelect} />
        </div>
      </div>
    </div>
  );
};

export default InstrumentPagesContainer;
