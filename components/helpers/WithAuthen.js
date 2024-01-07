'use client'
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { updateAccessToken } from '../../redux/reducer/authSlice';
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function withAuth(WrappedComponent) {
    function WithAuthComponent(props) {
        const router = useRouter();
        const [isLoading, setIsLoading] = useState(true);
        const userInfo = useSelector(state => state.auth);
        const dispatch = useDispatch();
        const currentPath = usePathname();

        useEffect(() => {
            // Bỏ qua xác thực nếu đang ở trang /login
            if (currentPath === '/login' || currentPath === '/') {
                setIsLoading(false);
                return;
            }

            const checkTokenAndRefresh = async () => {
                try {
                    if (!userInfo) {
                        router.push("/login");
                    } else {
                        const accessToken = userInfo.userInfo.accessToken;
                        const refreshToken = userInfo.userInfo.refreshToken;
                        const username = userInfo.userInfo.username;

                        const decodedToken = jwtDecode(accessToken);
                        const currentTime = Date.now() / 1000;

                        if (decodedToken.exp < currentTime) {
                            setIsLoading(true);
                            const response = await axios.post(
                                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/refresh-token`,
                                { refreshToken, username }
                            );

                            const newAccessToken = response.data.newAccessToken;

                            dispatch(updateAccessToken(newAccessToken));
                            setIsLoading(false);
                        } else {
                            setIsLoading(false);
                        }
                    }
                } catch (error) {
                    console.error("Error:", error);
                    router.push("/login");
                    setIsLoading(false);
                }
            };

            checkTokenAndRefresh();
        }, [router, userInfo, dispatch]);

        if (isLoading) {
            return <div>Loading...</div>; // Hoặc một spinner
        }

        return <WrappedComponent {...props} />;
    }
    return WithAuthComponent;
}

export default withAuth;
