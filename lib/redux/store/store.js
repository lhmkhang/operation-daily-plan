/* import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import rootReducer from '../reducer/rootReducer';
import { createPersistStorage } from './createPersistStorage'; // Đảm bảo đường dẫn đúng

const persistConfig = {
    key: 'root',
    storage: createPersistStorage(),
    whitelist: ['auth']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
});

export const persistor = typeof window !== "undefined" ? persistStore(store) : null;
 */

import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { createPersistStorage } from './createPersistStorage';
import rootReducer from '../slices/rootReducer';
import { middleware as customMiddleware } from './middleware';

const persistConfig = {
    key: 'root',
    storage: createPersistStorage(),
    whitelist: ['auth']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
        let middleware = getDefaultMiddleware({
            serializableCheck: false
        });

        // Chỉ thêm customMiddleware trong môi trường phát triển
        if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') {
            middleware = middleware.concat(customMiddleware);
        }

        return middleware;
    }
});

export const persistor = typeof window !== "undefined" ? persistStore(store) : null;
