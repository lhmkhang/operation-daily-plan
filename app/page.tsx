'use client'
import * as React from 'react';
import { NavBar, Report, Header } from '@/components';
import LuckyWheel from '@/components/base/LuckyWheel'
import { BreadcrumbObject } from '@/components/base/BreadCrumb';
import { useTheme, } from '@mui/material/styles';
import { Box } from '@mui/material';
import withAuth from "../components/helpers/WithAuthen";
import { AuthContext } from "@/components/helpers/AuthenContext";

function App() {
    const theme = useTheme();
    const [arrBreadcrumb, setArrBreadcrumb] = React.useState<BreadcrumbObject[]>([{ name: 'Report', component: 'report' }]);
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
                <Header />
                <div className='container'>
                    {renderComponent()}
                </div>
            </Box>
        </Box>
    );
}

export default withAuth(App)