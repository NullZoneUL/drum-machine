import React, { useCallback, useMemo } from 'react';
import NumSelector from '@elements/num-selector';
import ButtonText from '@elements/button-text';
import LightDotIndicatorContainer from '@elements/light-dot-indicator';
import Translation from '@assets/literals/literals';
import {
  TICKS_BY_PAGE,
  DEFAULT_MAIN_PAGES,
  MAX_PAGES,
} from '@/utils/default_values';
import { CustomEventNames } from '@/utils/event';
import { useEventListener } from '@/hooks/event-listener';
import './style.scss';

const InstrumentPagesContainer = () => {
  const mainNumPages = useEventListener(
    CustomEventNames.mainPages,
    DEFAULT_MAIN_PAGES,
  );

  const maxTicksValue = useMemo(
    () => TICKS_BY_PAGE * mainNumPages,
    [mainNumPages],
  );

  const onPageSelect = useCallback(() => {
    console.log('TODO!!!');
  }, []);

  return (
    <div className="instrument-pages-container">
      <div className="instrument-pages-container-center">
        <div className="instrument-ticks-length">
          <NumSelector
            onChange={(value: number) =>
              console.log(`TODO!!! Instrument pages value: ${value}`)
            }
            minValue={1}
            maxValue={maxTicksValue}
            defaultValue={maxTicksValue}
          />
          <span>{maxTicksValue}</span>
        </div>
        <div className="instrument-pages-selector">
          <LightDotIndicatorContainer numLights={MAX_PAGES} />
          <ButtonText text={Translation.page} callback={onPageSelect} />
        </div>
      </div>
    </div>
  );
};

export default InstrumentPagesContainer;
