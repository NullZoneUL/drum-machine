import React from 'react';
import './style.scss';

interface ButtonTextProps {
  text: string;
  callback: () => void;
  className?: string;
}

const ButtonText = ({ text, callback, className }: ButtonTextProps) => {
  return (
    <button className={`dm-button-text ${className}`} onClick={callback}>
      {text}
    </button>
  );
};

export default ButtonText;
