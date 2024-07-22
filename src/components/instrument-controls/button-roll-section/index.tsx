import React, { useCallback, useMemo } from 'react';
import ButtonRoll from '@elements/button-roll';
import { TICKS_BY_PAGE } from '@utils/default_values';
import './style.scss';

interface ButtonRollContainerProps {
  selectedPage: number;
  limitTicks: number;
}

const ButtonRollContainer = ({
  selectedPage,
  limitTicks,
}: ButtonRollContainerProps) => {
  //TODO!!! Implement tests...

  const onButtonRollClicked = useCallback((index: number) => {
    console.log(`TODO!!! Button roll click. Index: ${index}`);
  }, []);

  const firstPageTick = useMemo(() => {
    return (selectedPage - 1) * TICKS_BY_PAGE;
  }, [selectedPage]);

  return (
    <div className="buttons-roll-container">
      {[...Array(TICKS_BY_PAGE)].map((x, i) => (
        <ButtonRoll
          number={i + 1}
          key={`BUTTON_ROLL_${i}`}
          selected={false}
          playing={false}
          onClick={onButtonRollClicked}
          disabled={limitTicks < firstPageTick + i}
        />
      ))}
    </div>
  );
};

export default ButtonRollContainer;
