'use client'
import React, { useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../helpers/AuthenContext";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";

function withAuth(WrappedComponent) {
    function WithAuthComponent(props) {
        const router = useRouter();
        const { user, setUser } = useContext(AuthContext);
        const [isLoading, setIsLoading] = useState(true);
        const [isNavigating, setIsNavigating] = useState(false);

        console.log("URL: ", usePathname());

        useEffect(() => {
            let accessToken;
            let refreshToken;
            let username;

            console.log(`User in WithAuthen HOC: ${user}`);

            const checkTokenAndRefresh = async () => {
                try {
                    if (!user) {
                        setIsNavigating(true);
                        router.push("/login");
                    } else {
                        accessToken = JSON.parse(user).accessToken;
                        refreshToken = JSON.parse(user).refreshToken;
                        username = JSON.parse(user).username;
                        const decodedToken = jwtDecode(accessToken);
                        const currentTime = Date.now() / 1000;

                        if (decodedToken.exp < currentTime) {
                            setIsLoading(true);
                            const response = await axios.post(
                                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/refresh-token`,
                                { refreshToken, username }
                            );

                            const newAccessToken = response.data.newAccessToken;
                            let tokenData = JSON.parse(sessionStorage.getItem("token"));
                            tokenData.accessToken = newAccessToken;
                            setUser(JSON.stringify(tokenData)); // Cập nhật context
                            sessionStorage.setItem("token", JSON.stringify(tokenData));
                            setIsLoading(false);
                        } else {
                            setIsLoading(false);
                        }
                    }
                } catch (error) {
                    console.error("Error:", error);
                    setIsNavigating(true);
                    setIsLoading(false);
                    router.push("/login");
                }
            };

            checkTokenAndRefresh();
        }, [user, router, setUser]);

        if (isNavigating) {
            return null;
        }

        if (isLoading) {
            return <div>Loading...</div>; // Hoặc một spinner
        }

        return <WrappedComponent {...props} />;
    }

    return WithAuthComponent;
}

export default withAuth;
