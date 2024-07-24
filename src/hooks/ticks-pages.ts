import { useMemo } from 'react';
import { CustomEventNames } from '@utils/event';
import { DEFAULT_MAIN_PAGES, TICKS_BY_PAGE } from '@utils/default_values';
import { useEventListener } from './event-listener';

export const useTicksPagesListener = () => {
  const mainNumPages = useEventListener(
    CustomEventNames.mainPages,
    DEFAULT_MAIN_PAGES,
  );

  const maxTicksValue = useMemo(
    () => TICKS_BY_PAGE * mainNumPages,
    [mainNumPages],
  );

  return { mainNumPages, maxTicksValue };
};
