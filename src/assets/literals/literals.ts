import es from './files/en.json';

const getLiteralsByLang = (lang: string) => {
  switch (lang) {
    case 'en':
    default:
      return es;
  }
};

const Translation = getLiteralsByLang('en');

export default Translation;
