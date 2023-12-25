// Định nghĩa các action types
export const SET_AUTH_INFO = 'SET_AUTH_INFO';
export const CLEAR_AUTH_INFO = 'CLEAR_AUTH_INFO';

// Action creators
export const setAuthInfo = (payload) => ({
    type: SET_AUTH_INFO,
    payload
});

export const clearAuthInfo = () => ({
    type: CLEAR_AUTH_INFO,
});
