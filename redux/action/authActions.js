import { SET_AUTH_INFO, CLEAR_AUTH_INFO } from './constants';
// Action creators
export const setAuthInfo = (payload) => ({
    type: SET_AUTH_INFO,
    payload
});

export const clearAuthInfo = () => ({
    type: CLEAR_AUTH_INFO,
});

export const updateAccessToken = (newAccessToken) => ({
    type: 'UPDATE_ACCESS_TOKEN',
    payload: newAccessToken
});