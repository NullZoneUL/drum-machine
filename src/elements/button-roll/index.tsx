import React from 'react';
import './style.scss';

interface ButtonRollProps {
  number: number;
}

const ButtonRoll = ({ number }: ButtonRollProps) => {
  return (
    <button className="button-roll">
      <div className="button-roll-container">{number}</div>
    </button>
  );
};

export default ButtonRoll;
