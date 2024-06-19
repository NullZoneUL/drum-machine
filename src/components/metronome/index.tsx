import React, { useCallback, useEffect, useState } from 'react';
import ButtonIcon from '@elements/button-icon';
import MetronomeIcon from '@assets/images/metronome.webp';
import { playMetronome, stopMetronome } from './service';
import './style.scss';

const MetronomeButton = () => {
  const [isPressed, setButtonState] = useState(false); //false -> not pressed

  useEffect(() => {
    isPressed ? playMetronome() : stopMetronome();
  }, [isPressed]);

  const onClick = useCallback(
    () => setButtonState(isPressed => !isPressed),
    [],
  );

  return (
    <ButtonIcon
      icon={MetronomeIcon}
      onClick={onClick}
      className={`metronome-button ${isPressed ? 'metronome-button-pressed' : ''}`}
    />
  );
};

export default MetronomeButton;
