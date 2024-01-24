'use client'

import React, { createContext, useState } from 'react';

export const ReportDetailContext = createContext();

export const ReportDetailProvider = ({ children }) => {
    const [reportsInfo, setReportsInfo] = useState({});

    return (
        <ReportDetailContext.Provider value={{ reportsInfo, setReportsInfo }}>
            {children}
        </ReportDetailContext.Provider>
    );
};
