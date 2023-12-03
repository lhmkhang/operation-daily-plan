'use client'
import * as React from 'react';
import { BreadCrumb, NavBar, Report, LuckyWheel } from '@/components';
import { BreadcrumbObject } from '@/components/base/BreadCrumb';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';


export default function MiniDrawer() {
    const theme = useTheme();
    const [arrBreadcrumb, setArrBreadcrumb] = React.useState<BreadcrumbObject[]>([{ name: 'Home', href: '/' }]);
    const [selectedComponent, setSelectedComponent] = React.useState<string>('');

    const renderComponent = () => {
        switch (selectedComponent) {
            case "report":
                return <Report />
            case "lucky_wheel":
                return <LuckyWheel />
            default:
                return <p>"Chưa có component nào được chọn"</p>
        }
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <NavBar selectedComponent={setSelectedComponent} />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <div className='flex items-center justify-start'>
                    <BreadCrumb key={"breadcrumb"} items={arrBreadcrumb} />
                </div>
                <div className='container'>
                    {renderComponent()}
                </div>
            </Box>
        </Box>
    );
}