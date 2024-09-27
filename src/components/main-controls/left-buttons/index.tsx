import ButtonIcon from '@elements/button-icon';
import MetronomeButton from '@components/metronome';
import PlayIcon from '@assets/images/play.webp';
import PauseIcon from '@assets/images/pause.webp';
import StopIcon from '@assets/images/stop.webp';
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
      <MetronomeButton />
    </div>
  );
};

export default MainControlsLeftButtons;
