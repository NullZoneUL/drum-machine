import React, { useCallback } from 'react';
import ButtonRoll from '@elements/button-roll';
import { TICKS_BY_PAGE } from '@/utils/default_values';
import './style.scss';

const ButtonRollContainer = () => {
  const onButtonRollClicked = useCallback((index: number) => {
    console.log(`TODO!!! Button roll click. Index: ${index}`);
  }, []);

  return (
    <div className="buttons-roll-container">
      {[...Array(TICKS_BY_PAGE)].map((x, i) => (
        <ButtonRoll
          number={i + 1}
          key={`BUTTON_ROLL_${i}`}
          selected={false}
          playing={false}
          onClick={onButtonRollClicked}
        />
      ))}
    </div>
  );
};

export default ButtonRollContainer;
