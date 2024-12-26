pub const TICKS_BY_PAGE: u16 = 16;

pub const DEFAULT_MAIN_PAGES: u16 = 4;

pub const MAX_PAGES: u16 = 4;

pub const SUBTICKS_BY_TICK: u16 = 5;

pub const QUARTER_TICK: u32 = 4 * SUBTICKS_BY_TICK as u32;

pub const GENERAL_MAX_TICKS: u32 = (TICKS_BY_PAGE * MAX_PAGES) as u32;

pub const SYSTEM_MAX_TICKS: u32 = GENERAL_MAX_TICKS * SUBTICKS_BY_TICK as u32;
