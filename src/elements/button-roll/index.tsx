import React from 'react';
import './style.scss';

interface ButtonRollProps {
  number: number;
}

const ButtonRoll = ({ number }: ButtonRollProps) => {
  return <button className="button-roll">{number}</button>;
};

export default ButtonRoll;
