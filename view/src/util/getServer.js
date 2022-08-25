import queryString from 'query-string';

import {
  SERVER_ADDRESS,
} from '../constants/index';

export const getServer = (url, param) => {
  if (url === 'getOneBuildTable') {
    return `${SERVER_ADDRESS}/api/build?jobName=${param.jobName}&buildNumber=${param.buildNumber}`;
  }

  if (url === 'insight/ci') {
    return `${SERVER_ADDRESS}/api/insight/ci?${queryString.stringify({
      startDate: param.startDate,
      endDate: param.endDate,
      allBranches: param.allBranches,
    })}`;
  }

  if (url === 'getBuildsTable') {
    const queryParams = {
      page: param.page,
      num: param.num,
    };
    if (param.jobName) {
      queryParams.jobName = param.jobName;
    }
    const qs = queryString.stringify(queryParams);
    return `${SERVER_ADDRESS}/api/build?${qs}`;
  }

  if (url === 'getWebhooks' || url === 'postWebhooks') {
    return `${SERVER_ADDRESS}/api/config`;
  }

  if (url === 'getSite' || url === 'postSite') {
    return `${SERVER_ADDRESS}/api/config`;
  }

  return `${SERVER_ADDRESS}/api/delegate/message`;
};
