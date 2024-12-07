import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    myData: [],
    status: 'idle',
    error: null,
};

const jellyBeanMainDataSlice = createSlice({
    name: 'jellyBeanData',
    initialState,
    reducers: {
        setJellyBeanData: (state = initialState, action: { type: any, payload: any }) => {        
            state.myData = action.payload;
        }
    }
});

export const { setJellyBeanData } = jellyBeanMainDataSlice.actions;
export default jellyBeanMainDataSlice.reducer;