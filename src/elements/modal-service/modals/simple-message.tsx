import ButtonText from '@elements/button-text';
import Translation from '@assets/literals/literals';
import { publishEvent, CustomEventNames } from '@utils/event';
import './style.scss';

interface SimpleMessageModalProps {
  message: string;
}

const onModalClose = () => {
  publishEvent(CustomEventNames.hideModalEvent);
};

const SimpleMessageModal = ({ message }: SimpleMessageModalProps) => {
  return (
    <div className="simple-message-modal">
      <p>{message}</p>
      <ButtonText text={Translation.accept} callback={onModalClose} />
    </div>
  );
};

export default SimpleMessageModal;
