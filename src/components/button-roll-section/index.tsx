import React from 'react';
import ButtonRoll from '@elements/button-roll';
import './style.scss';

const NUM_BUTTONS = 16;

const ButtonRollContainer = () => {
  return (
    <div className="buttons-roll-container">
      {[...Array(NUM_BUTTONS)].map((x, i) => (
        <ButtonRoll number={i + 1} key={`BUTTON_ROLL_${i}`} />
      ))}
    </div>
  );
};

export default ButtonRollContainer;
