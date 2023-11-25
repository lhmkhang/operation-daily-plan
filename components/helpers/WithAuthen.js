'use client'
import React, { useContext, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { AuthContext } from '../helpers/AuthenContext';
import { useRouter } from 'next/navigation';

function withAuth(WrappedComponent) {
    function WithAuthComponent(props) {
        const router = useRouter();
        const { user } = useContext(AuthContext);

        useEffect(() => {

            let accessToken;
            let isTokenValid = false;

            try {
              if (!user) {
                router.push("/login");
              } else {
                accessToken = JSON.parse(user).accessToken;
                const decodedToken = jwtDecode(accessToken);
                const currentTime = Date.now() / 1000;

                if (decodedToken.exp > currentTime) {
                  isTokenValid = true;
                }

                if (!accessToken || !isTokenValid) {
                  router.push("/login");
                }
              }
            } catch (error) {
              console.error("Error parsing user:", error);
            }

            
        }, [user, router]);

        return user ? <WrappedComponent {...props} /> : null;
    }

    return WithAuthComponent;
}

export default withAuth;
