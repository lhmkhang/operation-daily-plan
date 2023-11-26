'use client'

import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        if (typeof window !== 'undefined') {
            return sessionStorage.getItem('token');
        }
        return null
    });

    useEffect(() => {
        const storedUser = sessionStorage.getItem('token');
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    // Hàm để cập nhật thông tin người dùng sau khi đăng nhập
    const login = (userData) => {
        setUser(JSON.stringify(userData));

        // console.log("USER: ", user);
        sessionStorage.setItem('token', JSON.stringify(userData));
    };

    // Hàm để đăng xuất
    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('token');
    };

    return (
      <AuthContext.Provider value={{ user, setUser, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
};
