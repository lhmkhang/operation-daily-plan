import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

export function createPersistStorage() {
    const isServer = typeof window === 'undefined';

    // Returns noop (dummy) storage on server-side.
    if (isServer) {
        return {
            getItem() {
                return Promise.resolve(null);
            },
            setItem() {
                return Promise.resolve();
            },
            removeItem() {
                return Promise.resolve();
            },
        };
    }

    // Returns localStorage on client-side.
    return createWebStorage('session');
}
