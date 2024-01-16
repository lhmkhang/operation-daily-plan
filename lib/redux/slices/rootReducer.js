/* import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';
// Import các reducers khác

const rootReducer = combineReducers({
    auth: authReducer,
    // kết hợp các reducers khác
});

export default rootReducer; */

import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice/authSlice';
import themeReducer from './themeSlice/themeSlice';
import pageReducer from './pageSlice/pageSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    theme: themeReducer,
    page: pageReducer
    // Các reducers khác
});

export default rootReducer;
