import { useEffect, useState } from 'react';
import {
  subscribeEvent,
  unsubscribeEvent,
  CustomEventNames,
} from '@/utils/event';

export const useEventListener = (
  eventName: keyof typeof CustomEventNames,
  defaultValue?: any,
) => {
  const [value, setNewValue] = useState(defaultValue);

  useEffect(() => {
    const eventListener = (data: { detail: any }) => {
      setNewValue(data.detail);
    };
    subscribeEvent(eventName, eventListener);

    return () => {
      unsubscribeEvent(eventName, eventListener);
    };
  }, []);

  return value;
};
