// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import paginationReducer from '../slices/paginationSlice';
import jellyBeanReducer from '../slices/jellyBeanMainDataSlice'

export const store = configureStore({
  reducer: {
    pagination: paginationReducer,
    jellyBeanData: jellyBeanReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
