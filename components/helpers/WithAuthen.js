'use client'
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../helpers/AuthenContext';
import { useRouter } from 'next/navigation';

function withAuth(WrappedComponent) {
    function WithAuthComponent(props) {
        const { user } = useContext(AuthContext);
        const router = useRouter();

        useEffect(() => {
            if (router.isReady && !user) {
                router.push('/login');
            }
        }, [user, router]);

        return user ? <WrappedComponent {...props} /> : null;
    }

    return WithAuthComponent;
}

export default withAuth;
