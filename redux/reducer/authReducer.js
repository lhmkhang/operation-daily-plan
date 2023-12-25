// reducers/authReducer.js
import { SET_AUTH_INFO, CLEAR_AUTH_INFO, UPDATE_ACCESS_TOKEN } from '../action/constants';

const initialState = {
    userInfo: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_INFO:
            return {
                ...state,
                userInfo: action.payload
            };
        case CLEAR_AUTH_INFO:
            return {
                ...initialState
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
