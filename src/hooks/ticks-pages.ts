import { useMemo } from 'react';
import { CustomEventNames } from '@utils/event';
import { DEFAULT_MAIN_PAGES, TICKS_BY_PAGE } from '@utils/default_values';
import { useEventListener } from './event-listener';

let acutalMainPages = DEFAULT_MAIN_PAGES;

export const useTicksPagesListener = () => {
  const mainNumPages = useEventListener(
    CustomEventNames.mainPages,
    acutalMainPages,
  );

  acutalMainPages = mainNumPages;

  const maxTicksValue = useMemo(
    () => TICKS_BY_PAGE * mainNumPages,
    [mainNumPages],
  );

  return { mainNumPages, maxTicksValue };
};
