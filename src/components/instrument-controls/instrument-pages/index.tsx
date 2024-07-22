import React, { useCallback, useEffect, useMemo, useState } from 'react';
import NumSelector from '@elements/num-selector';
import ButtonText from '@elements/button-text';
import LightDotIndicatorContainer from '@elements/light-dot-indicator';
import Translation from '@assets/literals/literals';
import {
  TICKS_BY_PAGE,
  DEFAULT_MAIN_PAGES,
  MAX_PAGES,
} from '@utils/default_values';
import { CustomEventNames } from '@utils/event';
import { useEventListener } from '@hooks/event-listener';
import './style.scss';

interface InstrumentPagesContainerProps {
  setTicksByLoop: (numTicks: number) => void;
  setSelectedPage: (numPages: number) => void;
}

const InstrumentPagesContainer = ({
  setTicksByLoop,
  setSelectedPage,
}: InstrumentPagesContainerProps) => {
  //TODO!!! Implement tests...
  const mainNumPages = useEventListener(
    CustomEventNames.mainPages,
    DEFAULT_MAIN_PAGES,
  );

  const [page, setPage] = useState(1);

  const maxTicksValue = useMemo(
    () => TICKS_BY_PAGE * mainNumPages,
    [mainNumPages],
  );

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
    setSelectedPage(page);
  }, [page]);

  return (
    <div className="instrument-pages-container">
      <div className="instrument-pages-container-center">
        <div className="instrument-ticks-length">
          <NumSelector
            onChange={setTicksByLoop}
            minValue={1}
            maxValue={maxTicksValue}
            defaultValue={maxTicksValue}
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
