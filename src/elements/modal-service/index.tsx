import { ReactNode, useCallback, useEffect, useState } from 'react';
import {
  subscribeEvent,
  unsubscribeEvent,
  CustomEventNames,
} from '@utils/event';
import './style.scss';

const ModalService = () => {
  const [modalChildren, setModalChildren] = useState<ReactNode>(null);

  const hideModal = useCallback(() => {
    setModalChildren(null);
  }, []);

  useEffect(() => {
    const newModal = (data: { detail: ReactNode }) =>
      setModalChildren(data.detail);

    subscribeEvent(CustomEventNames.newModalEvent, newModal);
    subscribeEvent(CustomEventNames.hideModalEvent, hideModal);

    return () => {
      unsubscribeEvent(CustomEventNames.newModalEvent, newModal);
      unsubscribeEvent(CustomEventNames.hideModalEvent, hideModal);
    };
  }, []);

  if (!modalChildren) {
    return <></>;
  }

  return <div className="modal-container">{modalChildren}</div>;
};

export default ModalService;
