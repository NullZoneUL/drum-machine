import React, { useCallback } from 'react';
import DMSelect from '@elements/select';
import DMKnob from '@elements/knob';
import Translation from '@assets/literals/literals';
import { numPages } from '@/utils/pages';
import { publishEvent, CustomEventNames } from '@/utils/event';
import './style.scss';

const MainControlsRightSection = () => {
  const onNumPagesChange_ = useCallback((index: number) => {
    publishEvent(CustomEventNames.mainPages, index + 1);
  }, []);

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
