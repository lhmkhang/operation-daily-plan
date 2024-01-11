'use client'
import * as React from 'react';
import { useEffect, useState, useContext, useRef, useMemo } from 'react';
// import { NavBar, Report, Header } from '@/components';
// import LuckyWheel from '@/components/base/LuckyWheel'
// import { BreadcrumbObject } from '@/components/base/BreadCrumb';
import { useTheme, } from '@mui/material/styles';
// import { Box } from '@mui/material';
import withAuth from "../components/helpers/WithAuthen";
// import { AuthContext } from "@/components/helpers/AuthenContext";
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

function App() {
    const theme = useTheme();
    const [arrBreadcrumb, setArrBreadcrumb] = useState([{ name: 'Report', component: 'report' }]);
    const [selectedComponent, setSelectedComponent] = useState('');

    const { userInfo } = useSelector(state => state.auth)
    // const { user } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {

        // Kiểm tra trạng thái đăng nhập từ AuthContext
        if (!userInfo) {
            router.push('/login'); // Chưa đăng nhập, chuyển hướng đến trang đăng nhập
        }
    }, [userInfo, router]);

    /* const renderComponent = () => {
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
                <Header />
                <div className='container'>
                </div>
            </Box>
        </Box>
    ); */
}

export default withAuth(App)