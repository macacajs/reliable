import locale from 'easy-i18n-cli/src/locale';
import en from './en-US';

window.__i18n = window.__i18n || locale({
  en,
  useEn() {
    const language = window.localStorage.RELIABLE_LANGUAGE || window.navigator.language;
    return language.startsWith('en');
  },
});
