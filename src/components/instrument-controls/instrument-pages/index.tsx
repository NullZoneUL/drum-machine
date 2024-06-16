import React, { useCallback, useMemo } from 'react';
import NumSelector from '@elements/num-selector';
import ButtonText from '@elements/button-text';
import Translation from '@assets/literals/literals';
import { TICKS_BY_PAGE } from '@/utils/default_values';
import './style.scss';

interface InstrumentPagesContainerProps {
  mainNumPages: number;
}

const InstrumentPagesContainer = ({
  mainNumPages,
}: InstrumentPagesContainerProps) => {
  const maxTicksValue = useMemo(
    () => TICKS_BY_PAGE * mainNumPages,
    [mainNumPages],
  );

  const onPageSelect = useCallback(() => {
    console.log('TODO!!!');
  }, []);

  return (
    <div className="instrument-pages-container">
      <div>
        <NumSelector
          onChange={(value: number) =>
            console.log(`TODO!!! Instrument pages value: ${value}`)
          }
          minValue={1}
          maxValue={maxTicksValue}
          defaultValue={maxTicksValue}
        />
        <span>{`/ ${maxTicksValue}`}</span>
      </div>
      <ButtonText text={Translation.page} callback={onPageSelect} />
    </div>
  );
};

export default InstrumentPagesContainer;
