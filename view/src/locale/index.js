import locale from 'easy-i18n-cli/src/web/locale';
import en from './en-US';

window.__i18n = window.__i18n || locale({
  en,
  getLanguage() {
    return window.localStorage.RELIABLE_LANGUAGE || window.navigator.language;
  },
});
