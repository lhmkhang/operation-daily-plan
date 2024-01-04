import { SET_AUTH_INFO, CLEAR_AUTH_INFO, UPDATE_ACCESS_TOKEN, SET_USER_ROLE } from '../action/constants';
import { REHYDRATE } from 'redux-persist';

const initialState = {
    userInfo: null,
    rehydrated: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REHYDRATE:
            if (action.payload && action.payload.auth) {
                return {
                    ...state,
                    ...action.payload.auth,
                    rehydrated: true
                };
            }
            return { ...state, rehydrated: true };
        case SET_AUTH_INFO:
            // Cập nhật cả userInfo và userRole từ payload
            return {
                ...state,
                userInfo: action.payload.userInfo, // Lưu toàn bộ dữ liệu vào userInfo
                rehydrated: false
            };
        case CLEAR_AUTH_INFO:
            return {
                ...initialState,
                rehydrated: state.rehydrated
            };
        case UPDATE_ACCESS_TOKEN:
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    accessToken: action.payload
                }
            }
        default:
            return state;
    }
};

export default authReducer;
