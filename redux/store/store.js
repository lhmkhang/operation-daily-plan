import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import authReducer from './reducers/authSlice';

const persistConfig = {
    key: 'root',
    storage: storageSession,
    whitelist: ['auth']
};

const persistedReducer = persistReducer(persistConfig, {
    auth: authReducer
});

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);
