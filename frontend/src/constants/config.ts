export const SITE_URL = process.env.NEXT_PUBLIC_SITE_DOMAIN
  ? `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}`
  : 'http://localhost:3000';

export const BACKEND_URL = process.env.NEXT_PUBLIC_SITE_DOMAIN
  ? `https://${process.env.NEXT_PUBLIC_SITE_DOMAIN}`
  : 'http://localhost:1337';

export const API_URL = `${BACKEND_URL}/api`;

export const YMAPS_API_KEY = process.env.NEXT_PUBLIC_YMAPS_API_KEY;
export const SUGGEST_API_KEY = process.env.NEXT_PUBLIC_SUGGEST_API_KEY;
