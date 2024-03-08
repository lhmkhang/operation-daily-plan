'use client'

import React, { createContext, useState } from 'react';

export const ReportNarbarContext = createContext();

export const ReportNarbarProvider = ({ children }) => {
    const [reportsNarbar, setReportsNarbar] = useState({});

    return (
        <ReportNarbarContext.Provider value={{ reportsNarbar, setReportsNarbar }}>
            {children}
        </ReportNarbarContext.Provider>
    );
};
