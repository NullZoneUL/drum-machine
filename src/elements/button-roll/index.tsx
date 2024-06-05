import React from 'react';

interface ButtonRollProps {
  number: number;
}

const ButtonRoll = ({ number }: ButtonRollProps) => {
  return <div className="button-roll">{number}</div>;
};

export default ButtonRoll;
