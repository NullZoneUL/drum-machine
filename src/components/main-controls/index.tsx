import React, { useCallback, useState } from 'react';
import NumSelector from '@elements/num-selector';
import MainControlsLeftButtons from './left-buttons';
import './style.scss';

export enum PlayerStates {
  'PLAYING',
  'PAUSED',
  'STOPPED',
}

const MainControlsContainer = () => {
  const [state, setState] = useState(PlayerStates.STOPPED);

  const onPlayPause = useCallback(() => {
    setState(state =>
      state === PlayerStates.PLAYING
        ? PlayerStates.PAUSED
        : PlayerStates.PLAYING,
    );
  }, []);

  const onStop = useCallback(() => {
    setState(PlayerStates.STOPPED);
  }, []);

  return (
    <div className="main-controls-container">
      <NumSelector
        defaultValue={120}
        minValue={1}
        maxValue={300}
        onChange={value => console.log(value)}
        className="main-timer"
      />
      <MainControlsLeftButtons
        playerState={state}
        onClickPlayPause={onPlayPause}
        onClickStop={onStop}
      />
    </div>
  );
};

export default MainControlsContainer;
