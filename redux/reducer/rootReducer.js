import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';
// Import các reducers khác

const rootReducer = combineReducers({
    auth: authReducer,
    // kết hợp các reducers khác
});

export default rootReducer;