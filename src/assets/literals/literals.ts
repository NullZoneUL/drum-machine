import es from './files/es.json';

const getLiteralsByLang = (lang: string) => {
  switch (lang) {
    case 'es':
    default:
      return es;
  }
};

const Translation = getLiteralsByLang('es');

export default Translation;
