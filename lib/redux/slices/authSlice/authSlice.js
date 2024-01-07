// import { SET_AUTH_INFO, CLEAR_AUTH_INFO, UPDATE_ACCESS_TOKEN, SET_USER_ROLE } from '../action/constants';
// import { REHYDRATE } from 'redux-persist';

// const initialState = {
//     userInfo: null,
//     rehydrated: false
// };

// const authReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case REHYDRATE:
//             if (action.payload && action.payload.auth) {
//                 return {
//                     ...state,
//                     ...action.payload.auth,
//                     rehydrated: true
//                 };
//             }
//             return { ...state, rehydrated: true };
//         case SET_AUTH_INFO:
//             // Cập nhật cả userInfo và userRole từ payload
//             return {
//                 ...state,
//                 userInfo: action.payload.userInfo, // Lưu toàn bộ dữ liệu vào userInfo
//                 rehydrated: false
//             };
//         case CLEAR_AUTH_INFO:
//             return {
//                 ...initialState,
//                 rehydrated: state.rehydrated
//             };
//         case UPDATE_ACCESS_TOKEN:
//             return {
//                 ...state,
//                 userInfo: {
//                     ...state.userInfo,
//                     accessToken: action.payload
//                 }
//             }
//         default:
//             return state;
//     }
// };

// export default authReducer;


import { createSlice } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';

const initialState = {
    userInfo: null,
    rehydrated: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthInfo: (state, action) => {
            state.userInfo = action.payload.userInfo;
            state.rehydrated = false;
        },
        clearAuthInfo: (state) => {
            state.userInfo = null;
            state.rehydrated = false;
        },
        updateAccessToken: (state, action) => {
            if (state.userInfo) {
                state.userInfo.accessToken = action.payload;
            }
        },
        // Các reducer khác có thể được thêm vào đây
    },
    extraReducers: (builder) => {
        builder.addCase(REHYDRATE, (state, action) => {
            if (action.payload && action.payload.auth) {
                return {
                    ...state,
                    ...action.payload.auth,
                    rehydrated: true
                };
            }
            return { ...state, rehydrated: true };
        })
    }
});

export const { setAuthInfo, clearAuthInfo, updateAccessToken } = authSlice.actions;
export default authSlice.reducer;
