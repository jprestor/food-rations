import clientCookies from 'js-cookie';

export const cookies = {
  get: (cookieName: string) => {
    if (typeof window === 'undefined') {
      const { cookies: serverCookies } = require('next/headers');
      return serverCookies().get(cookieName)?.value;
    } else {
      return clientCookies.get(cookieName);
    }
  },
  set: (
    cookieName: string,
    value: string,
    options?: clientCookies.CookieAttributes,
  ) => {
    if (typeof window === 'undefined') {
      throw Error('method "cookies.set" is not allowed on server');
    } else {
      return clientCookies.set(cookieName, value);
    }
  },
  remove: (cookieName: string) => {
    if (typeof window === 'undefined') {
      throw Error('method "cookies.remove" is not allowed on server');
    } else {
      return clientCookies.remove(cookieName);
    }
  },
};
