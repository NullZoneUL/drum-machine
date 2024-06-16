import React, { useCallback } from 'react';
import ButtonRoll from '@elements/button-roll';
import './style.scss';

const NUM_BUTTONS = 16;

const ButtonRollContainer = () => {
  const onButtonRollClicked = useCallback((index: number) => {
    console.log(`TODO!!! Button roll click. Index: ${index}`);
  }, []);

  return (
    <div className="buttons-roll-container">
      {[...Array(NUM_BUTTONS)].map((x, i) => (
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
