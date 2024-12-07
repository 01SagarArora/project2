import { combineReducers } from '@reduxjs/toolkit';
import { commonApi } from './../api/apis';
import paginationReducer from '../slices/paginationSlice';
import jellyBeanReducer from '../slices/jellyBeanMainDataSlice'

export const rootReducer = {
    pagination: paginationReducer,
    jellyBeanData: jellyBeanReducer,
    [commonApi.reducerPath]: commonApi.reducer,
};

export function createReducer() {
    return combineReducers(rootReducer);
}