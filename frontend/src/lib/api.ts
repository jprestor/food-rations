import qs from 'qs';
import { API_URL } from '@/constants';
import clientCookies from 'js-cookie';

export const api = async (
  path: string,
  queryParamsObject = {},
  options: RequestInit = {},
) => {
  let cookiesString: string | undefined;
  let authToken: string | undefined;

  try {
    if (typeof window === 'undefined') {
      const { cookies: serverCookies } = require('next/headers');
      cookiesString = serverCookies().toString();
      authToken = serverCookies().get('authToken')?.value;
    } else {
      authToken = clientCookies.get('authToken');
    }

    // Merge default and user options
    const mergedOptions: RequestInit = {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(cookiesString && { Cookie: cookiesString }),
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
      },
      ...options,
    };

    // Build request URL
    const queryString = qs.stringify(queryParamsObject, { encode: false });
    const requestUrl = `${API_URL}${path}${
      queryString ? `?${queryString}` : ''
    }`;

    // Trigger API call
    return fetch(requestUrl, mergedOptions);
  } catch (error) {
    console.error(error);
    throw new Error(
      `Please check if your server is running and you set all the required tokens.`,
    );
  }
};
