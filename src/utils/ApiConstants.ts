export const DEV_BASE_URL = 'http://localhost:8000';

export const PROD_BASE_URL = 'https://secure.yatra.com';

export const BASE_URL = process.env.NODE_ENV==='development' ? DEV_BASE_URL: PROD_BASE_URL

export const GET_JELLY_BEAN = 'data';