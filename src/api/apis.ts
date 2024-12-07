import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../utils/ApiConstants';

let createApiFunction = createApi;

export const commonApi = createApiFunction({
  reducerPath: 'commonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: builder => ({
    getApi: builder.query<any, any>({
      query: ({ url, params }) => {
        return {
          url,
          headers: {
            'content-type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
          },
          params: params,
        }
      },
    }),
    postApi: builder.query<any, any>({
      query: ({ cookie, url, data }) => {
        return {
          url,
          method: 'POST',
          headers: {
            'content-type': 'application/json;charset=UTF-8',
            'cookie': cookie,
          },
          body: data,
          responseHandler: (response: { text: () => any }) => response.text()

        }
      },
    })
  })
})