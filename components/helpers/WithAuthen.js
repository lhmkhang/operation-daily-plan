'use client'
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../helpers/AuthenContext';
import { useRouter } from 'next/navigation';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const { user } = useContext(AuthContext);
        const router = useRouter();

        console.log("USER: ", user);

        useEffect(() => {
            // Kiểm tra xem router đã sẵn sàng chưa
            if (router.isReady) {
                if (!user) {
                    router.push('/login'); // Redirect nếu chưa đăng nhập
                }
            }
        }, [user, router]);

        return user ? <WrappedComponent {...props} /> : null;
    };
};

export default withAuth;
