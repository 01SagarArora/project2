// src/app/store.ts
import { configureStore, StateFromReducersMapObject } from '@reduxjs/toolkit';
import { commonApi, commonS2SApi } from '../api/apis';
import thunk from 'redux-thunk';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { rootReducer } from './rootReducer';

export const initStore = (preloadedState?: Partial<RootState>) => configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk, commonApi.middleware, commonS2SApi.middleware),
    preloadedState,
    devTools: String(process.env.NODE_ENV).trim() !== 'production',
});

export type Store = ReturnType<typeof initStore>;
export type RootState = StateFromReducersMapObject<typeof rootReducer>;
export type AppDispatch = Store['dispatch'];


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
