import { createSlice } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';

const initialState = {

};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload;
        }
        // Các reducer khác có thể được thêm vào đây
    },

});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
