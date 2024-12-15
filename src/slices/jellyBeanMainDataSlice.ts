import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    myData: [],
    status: 'idle',
    error: false,
};

const jellyBeanMainDataSlice = createSlice({
    name: 'jellyBeanData',
    initialState,
    reducers: {
        setJellyBeanData: (state = initialState, action: { type: any, payload: any }) => {        
            console.log("payload",action.payload)
            state.myData = action.payload;
        }
    }
});

export const { setJellyBeanData } = jellyBeanMainDataSlice.actions;
export default jellyBeanMainDataSlice.reducer;