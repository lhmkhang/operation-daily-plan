'use client'
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import '@/styles/sidebar.css';
import IconComponent from '@/components/base/Icon';
import logoCompany from '@/public/img/Logo_DIGI-TEXX_2021_White.png'
import logoSCompany from '@/public/img/logoWhite.png'
import Image from 'next/image';
import { useSelector } from 'react-redux';


const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const listNavItems = [
    {
        itemName: "Home",
        itemIcon: "IoHome",
        itemComponent: "home",
        itemType: "single"
    },
    {
        itemName: "Lucky Money",
        itemIcon: "Games",
        itemComponent: "lucky_money",
        itemType: "single"
    },
    {
        itemName: "Spin Machine",
        itemIcon: "SportsEsports",
        itemComponent: "spin",
        itemType: "single"
    },
    {
        itemName: "Report",
        itemIcon: "Description",
        itemComponent: "report",
        itemType: "single"
    },
    {
        itemName: "Report Config",
        itemIcon: "SettingsSuggest",
        itemComponent: "report_config",
        itemType: "single"
    }
]

export default function Sidebar() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [activeComponent, setActiveComponent] = React.useState("");
    const userInfo = useSelector(state => state.auth.userInfo);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const styleTextEaseInOut = (animate) => {
        return {
            transitionTimingFunction: animate === "in" ? 'cubic-bezier(0.4, 0, 1, 1)' : 'cubic-bezier(0, 0, 0.2, 1)',
            transitionDuration: '300ms',
            opacity: animate === "in" ? '1' : '0',
        }
    }

    const renderNavItems = () => {
        const result = [];
        for (let i = 0; i < listNavItems.length; i++) {
            const obj = listNavItems[i];
            result.push(
                <ListItem
                    key={obj.itemName}
                    disablePadding
                >
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                            color: 'white'
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                                color: 'white'
                            }}
                        // className={`${activeComponent == obj.itemComponent ? "text-white" : ""}`}
                        >
                            <IconComponent iconName={obj.itemIcon} size='normal' />
                        </ListItemIcon>
                        <ListItemText
                            primary={obj.itemName}
                            sx={{ opacity: open ? 1 : 0, }}
                            primaryTypographyProps={{
                                sx: {
                                    color: `${activeComponent == obj.itemComponent ? "rgba(0, 0, 0, 0.54)" : "white"}`,
                                    fontWeight: 600,
                                }
                                // style: open ? styleTextEaseInOut("in") : styleTextEaseInOut("out")
                            }}
                        />
                    </ListItemButton>
                </ListItem>
            )
        }
        return result;
    }

    return userInfo ? (
        <Drawer variant="permanent" open={open} className='drawer-main'>
            <DrawerHeader>
                <Image
                    alt='Logo Company'
                    src={logoCompany}
                    priority
                    className='image-logo'
                    onClick={handleDrawerClose}
                    style={open ? styleTextEaseInOut("in") : styleTextEaseInOut("out")}
                />
                {/* <IconButton onClick={handleDrawerOpen} style={{ ...(open && { display: 'none' }), }}>
                    <MenuIcon sx={{ color: 'white' }} />
                </IconButton> */}
                <Image
                    src={logoSCompany}
                    priority
                    onClick={handleDrawerOpen}
                    style={{ ...(open && { display: 'none' }) }}
                    className='image-logo-small'
                />
            </DrawerHeader>
            <Divider />
            <List>
                {renderNavItems()}
            </List>
        </Drawer>
    ) : (null);
}