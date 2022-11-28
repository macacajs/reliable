import en from './en-US';

const language = window.localStorage.RELIABLE_LANGUAGE || window.navigator.language;
window.__i18n = window.__i18n || function (key) {
  if (language.startsWith('zh')) {
    return key;
  }
  return en[key];
};
