import './style.scss';

interface ButtonIconProps {
  icon: string;
  onClick: () => void;
  className?: string;
}

const ButtonIcon = ({ icon, onClick, className = '' }: ButtonIconProps) => {
  return (
    <button onClick={onClick} className={`dm-button ${className}`}>
      <img src={icon} />
    </button>
  );
};

export default ButtonIcon;
