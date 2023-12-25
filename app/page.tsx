'use client'
import * as React from 'react';
import { useEffect, useState, useContext, useRef, useMemo } from 'react';
import { NavBar, Report, Header } from '@/components';
import LuckyWheel from '@/components/base/LuckyWheel'
import { BreadcrumbObject } from '@/components/base/BreadCrumb';
import { useTheme, } from '@mui/material/styles';
import { Box } from '@mui/material';
import withAuth from "../components/helpers/WithAuthen";
import { AuthContext } from "@/components/helpers/AuthenContext";
import { useRouter } from 'next/navigation';

function App() {
    /* const theme = useTheme();
    const [arrBreadcrumb, setArrBreadcrumb] = React.useState<BreadcrumbObject[]>([{ name: 'Report', component: 'report' }]);
    const [selectedComponent, setSelectedComponent] = React.useState<string>(''); */

    const { user } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {

        // Kiểm tra trạng thái đăng nhập từ AuthContext
        if (!user) {
            router.push('/login'); // Chưa đăng nhập, chuyển hướng đến trang đăng nhập
        } else {
            router.push('/lucky-money'); // Đã đăng nhập, chuyển hướng đến trang /lucky-money
        }
    }, [user, router]);

    /* const renderComponent = () => {
        switch (selectedComponent) {
            case "report":
                return <Report />
            case "lucky_wheel":
                return <LuckyWheel />
            default:
                return <p>"Chưa có component nào được chọn"</p>
        }
    } */
    /* return (
        <Box sx={{ display: 'flex' }}>
            <NavBar selectedComponent={setSelectedComponent} />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Header />
                <div className='container'>
                </div>
            </Box>
        </Box>
    ); */
}

export default withAuth(App)