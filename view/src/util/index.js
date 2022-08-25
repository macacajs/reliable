export const queryParse = url => {
  const qs = {};
  if (!url) {
    return qs;
  }
  url.replace(/([^?=&]+)(=([^&]*))?/g, ($0, $1, $2, $3) => {
    if ($3 === undefined) {
      return;
    }
    qs[$1] = decodeURIComponent($3);
  });
  return qs;
};

export const getUuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const logger = (...content) => {
  const debugMode = location.href.indexOf('__debug') > -1;

  if (!debugMode) {
    return;
  }
  console.log(...content);
};

export const mapBuildDataToColor = data => {
  const state = data && data.state;
  if (state === 'INIT') return;

  const number = data && data.testInfo && data.testInfo.linePercent;
  return mapNumberToColor(number);
};

export const mapNumberToColor = number => {
  let color = 'egt-0';

  if (number >= 90) {
    color = 'egt-90';
  } else if (number >= 80) {
    color = 'egt-80';
  } else if (number >= 70) {
    color = 'egt-70';
  } else if (number >= 60) {
    color = 'egt-50';
  } else if (number >= 50) {
    color = 'egt-30';
  }
  return `color-${color}`;
};
