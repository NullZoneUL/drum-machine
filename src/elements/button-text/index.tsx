import React from 'react';

interface ButtonTextProps {
  text: string;
  onClick: () => void;
  className?: string;
}

const ButtonText = ({ text, onClick, className = '' }: ButtonTextProps) => {
  return (
    <button className={`dm-text-button ${className}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default ButtonText;
