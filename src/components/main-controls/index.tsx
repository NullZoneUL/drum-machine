import NumSelector from '@elements/num-selector';
import MainControlsLeftButtons from './left-buttons';
import MainControlsRightSection from './right-section';
import { useCallback, useEffect, useState } from 'react';
import { bpmValues } from '@utils/default_values';
import { setNewBPMs, onPlay, onPause, onStop } from '@utils/ticks/tick-system';
import './style.scss';

export enum PlayerStates {
  'PLAYING',
  'PAUSED',
  'STOPPED',
}

const MainControlsContainer = () => {
  const [state, setState] = useState(PlayerStates.STOPPED);

  useEffect(() => {
    state === PlayerStates.PLAYING
      ? onPlay()
      : state === PlayerStates.PAUSED
        ? onPause()
        : onStop();
  }, [state]);

  const onPlayPause = useCallback(() => {
    setState(state =>
      state === PlayerStates.PLAYING
        ? PlayerStates.PAUSED
        : PlayerStates.PLAYING,
    );
  }, []);

  const onStop_ = useCallback(() => {
    setState(PlayerStates.STOPPED);
  }, []);

  return (
    <div className="main-controls-container">
      <NumSelector
        defaultValue={bpmValues.default}
        minValue={bpmValues.min}
        maxValue={bpmValues.max}
        onChange={setNewBPMs}
        className="main-timer"
      />
      <MainControlsLeftButtons
        playerState={state}
        onClickPlayPause={onPlayPause}
        onClickStop={onStop_}
      />
      <MainControlsRightSection />
    </div>
  );
};

export default MainControlsContainer;
