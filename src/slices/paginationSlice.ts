import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

const initialState: PaginationState = {
  currentPage: 1,
  itemsPerPage: 1,
  totalItems: 1,  
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setTotalItems: (state, action: PayloadAction<number>) => {
      state.totalItems = action.payload;
    },
  },
});

export const { setCurrentPage, setTotalItems } = paginationSlice.actions;
export default paginationSlice.reducer;