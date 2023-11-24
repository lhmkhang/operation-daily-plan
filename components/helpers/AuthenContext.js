'use client'

import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        if (typeof window !== 'undefined') {
            return sessionStorage.getItem('access-token-bk');
        }
        return null
    });

    useEffect(() => {
        const storedUser = sessionStorage.getItem('access-token-bk');
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    // Hàm để cập nhật thông tin người dùng sau khi đăng nhập
    const login = (userData) => {
        setUser(userData);

        // console.log("USER: ", user);
        sessionStorage.setItem('access-token-bk', userData);
    };

    // Hàm để đăng xuất
    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('access-token-bk');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
