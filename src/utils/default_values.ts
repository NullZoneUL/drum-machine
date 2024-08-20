export const noItemsList = { itemValues: ['<none>'] };

export const TICKS_BY_PAGE = 16;

export const DEFAULT_MAIN_PAGES = 4;

export const MAX_PAGES = 4;

export const bpmValues = {
  default: 120,
  min: 1,
  max: 300,
};

export const SUBTICKS_BY_TICK = 5;

export const QUARTER_TICK = 4 * SUBTICKS_BY_TICK;

export const GENERAL_MAX_TICKS = TICKS_BY_PAGE * MAX_PAGES;

export const SYSTEM_MAX_TICKS = GENERAL_MAX_TICKS * SUBTICKS_BY_TICK;
