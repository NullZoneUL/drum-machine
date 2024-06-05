import React from 'react';
import ButtonRoll from '@elements/button-roll';

const NUM_BUTTONS = 16;

const ButtonRollContainer = () => {
  return (
    <div className="button-roll-container">
      <div className="buttons-section">
        {[...Array(NUM_BUTTONS)].map((x, i) => (
          <ButtonRoll number={i + 1} key={`BUTTON_ROLL_${i}`} />
        ))}
      </div>
    </div>
  );
};

export default ButtonRollContainer;
