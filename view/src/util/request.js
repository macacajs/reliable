import 'whatwg-fetch';

import { getServer } from './getServer';

const verbs = {
  GET(url) {
    return fetch(url, {
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  },

  POST(url, params) {
    return fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
  },

  DELETE(url) {
    return fetch(url, {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  },

  PUT(url, params) {
    return fetch(url, {
      method: 'PUT',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
  },
};

export default async (url, method = 'GET', params = {}) => {
  const res = await verbs[method](getServer(url, params), params);
  if (res.ok) {
    return res.json();
  } else if (res.status === 401) {
    const data = await res.json();
    if (data.url) {
      location.href = url;
    }
  } else {
    return {
      success: false,
      message: 'Network Errror',
    };
  }
};
