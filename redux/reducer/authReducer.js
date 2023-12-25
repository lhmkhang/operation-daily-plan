// reducers/authReducer.js
import { SET_AUTH_INFO, CLEAR_AUTH_INFO } from '../action/authActions';

const initialState = {
    token: null,
    userRole: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_INFO:
            return {
                ...state,
                token: action.payload.token,
                userRole: action.payload.userRole,
            };
        case CLEAR_AUTH_INFO:
            return {
                ...state,
                token: null,
                userRole: null,
            };
        default:
            return state;
    }
};

export default authReducer;
