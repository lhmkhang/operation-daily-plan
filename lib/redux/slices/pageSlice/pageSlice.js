import { createSlice } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';

const initialState = {
    pageSelect: null
};

const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        setSelectPage: (state, action) => {
            state.pageSelect = action.payload;
        }
        // Các reducer khác có thể được thêm vào đây
    },

});

export const { setSelectPage } = pageSlice.actions;
export default pageSlice.reducer;
