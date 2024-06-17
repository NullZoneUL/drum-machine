import Translation from '@assets/literals/literals';
import { DEFAULT_MAIN_PAGES } from './default_values';

export const numPages = Translation.pages.map((item, index) => {
  return { name: item, selected: index === DEFAULT_MAIN_PAGES - 1 };
});
