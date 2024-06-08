import React from 'react';
import ButtonIcon from '@elements/button-icon';
import PlayIcon from '@assets/images/play.webp';
import PauseIcon from '@assets/images/pause.webp';
import StopIcon from '@assets/images/stop.webp';
import MetronomeIcon from '@assets/images/metronome.webp';
import { PlayerStates } from '..';
import './style.scss';

interface MainControlsLeftButtonsProps {
  playerState: number;
  onClickPlayPause: () => void;
  onClickStop: () => void;
}

const MainControlsLeftButtons = ({
  playerState,
  onClickPlayPause,
  onClickStop,
}: MainControlsLeftButtonsProps) => {
  return (
    <div className="main-controls-left-buttons">
      <ButtonIcon
        icon={playerState === PlayerStates.PLAYING ? PauseIcon : PlayIcon}
        onClick={onClickPlayPause}
      />
      <ButtonIcon icon={StopIcon} onClick={onClickStop} />
      <ButtonIcon
        icon={MetronomeIcon}
        onClick={() => console.log('Todo!!!!!')}
      />
    </div>
  );
};

export default MainControlsLeftButtons;
