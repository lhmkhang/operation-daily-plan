'use client'
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../helpers/AuthenContext';
import { useRouter } from 'next/navigation';

function withAuth(WrappedComponent) {
    function WithAuthComponent(props) {
        const router = useRouter();
        const { user } = useContext(AuthContext);
        // console.log(user);
        useEffect(() => {
            if (typeof user === 'undefined' || user === null) {
                router.push('/login');
            }
        }, [user, router]);

        return user ? <WrappedComponent {...props} /> : null;
    }

    return WithAuthComponent;
}

export default withAuth;
