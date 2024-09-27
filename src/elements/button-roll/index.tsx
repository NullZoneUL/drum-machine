import './style.scss';

interface ButtonRollProps {
  number: number;
  selected: boolean;
  playing: boolean;
  onClick: (index: number) => void;
  disabled?: boolean;
}

const ButtonRoll = ({
  number,
  selected,
  playing,
  disabled = false,
  onClick,
}: ButtonRollProps) => {
  const onClick_ = () => {
    onClick(number - 1);
  };

  return (
    <button
      className={`button-roll ${selected ? 'button-roll-selected' : ''} ${playing ? 'button-roll-playing' : ''}`}
      onClick={onClick_}
      disabled={disabled}
    >
      <div className="button-roll-container">{number}</div>
    </button>
  );
};

export default ButtonRoll;
