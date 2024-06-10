import Translation from '@assets/literals/literals';

export const numPages = Translation.pages.map((item, index) => {
  return { name: item, selected: index === Translation.pages.length - 1 };
});
