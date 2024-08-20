import React, { useCallback, useContext, useEffect } from 'react';
import DMSelect from '@elements/select';
import DMKnob from '@elements/knob';
import Translation from '@assets/literals/literals';
import { numPages } from '@utils/pages';
import { publishEvent, CustomEventNames } from '@utils/event';
import { setNumPages } from '@utils/ticks/tick-system';
import { useTicksPagesListener } from '@hooks/ticks-pages';
import { InstrumentsContext } from '@components/app';
import './style.scss';

const MainControlsRightSection = () => {
  const { instruments } = useContext(InstrumentsContext);
  const { maxTicksValue } = useTicksPagesListener();

  const onNumPagesChange_ = useCallback((index: number) => {
    const numPages = index + 1;
    setNumPages(numPages);
    publishEvent(CustomEventNames.mainPages, numPages);
  }, []);

  useEffect(() => {
    const mxTicksBy0 = maxTicksValue - 1;
    instruments.forEach(item => {
      if (item.numTicks > mxTicksBy0) {
        item.numTicks = mxTicksBy0;
        item.manager.setNewMaxNumTicks(mxTicksBy0);
      }
    });
  }, [maxTicksValue]);

  return (
    <div className="main-controls-right-section">
      <DMSelect
        id="MAIN_PAGE_SELECTOR"
        items={numPages}
        onChange={onNumPagesChange_}
        className="main-controls-num-pages"
      />
      <DMKnob
        size={30}
        onChange={(value: number) => console.log(`TODO!!! Value: ${value}`)}
        title={Translation.volume}
        defaultValue={80}
      />
    </div>
  );
};

export default MainControlsRightSection;
