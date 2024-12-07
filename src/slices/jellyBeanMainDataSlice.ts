import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    myData: [],
};

const jellyBeanMainDataSlice = createSlice({
    name: 'jellyBeanData',
    initialState,
    reducers: {
        setJellyBeanData: (state = initialState, action: { type: any, payload: any }) => {        
            state.myData = action.payload;
            console.log("Updated",state.myData)

        }
    },
});

export const { setJellyBeanData } = jellyBeanMainDataSlice.actions;
export default jellyBeanMainDataSlice.reducer;