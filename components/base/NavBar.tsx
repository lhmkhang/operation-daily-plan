import React, { Component, ReactHTMLElement } from 'react'
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Icon, Drawer as MuiDrawer } from '@mui/material'
import BarChartIcon from '@mui/icons-material/BarChart';
import AttractionsIcon from '@mui/icons-material/Attractions';
import Image from 'next/image';
import logoBlue from '@/public/img/logoBlue.png'

type NavbarItem = {
    itemName: string,
    itemIcon: string,
    itemComponent: string
}

type Props = {
    navbarItems?: NavbarItem[]
}

const listNavItems = [
    {
        itemName: "Report",
        itemIcon: "bar_chart",
        itemComponent: "report"
    },
    {
        itemName: "Lucky Wheel",
        itemIcon: "attractions",
        itemComponent: "lucky_wheel"
    }
]

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
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

const NavBar = (props: Props) => {
    const [open, setOpen] = React.useState(false);
    const [activeComponent, setActiveComponent] = React.useState("");

    const handleClick = (value: string) => {
        setActiveComponent(value);
    }

    return (
        <Drawer variant="permanent" open={open}>
            <DrawerHeader className='justify-center'>
                <div className='flex items-center justify-start w-full h-full cursor-pointer' onClick={() => open ? setOpen(false) : setOpen(true)}>
                    <Image
                        alt='Logo Blue'
                        src={logoBlue}
                        priority
                        style={{ backgroundSize: "cover", width: "45px", height: "35px", padding: '0 5px 0 5px' }}
                    />
                    <p className={`m-0 text-4xl font-bold text-primary ${open ? 'ease-in opacity-100 duration-300' : 'ease-out opacity-0 duration-300'}`}>DIGI-TEXX</p>
                </div>
            </DrawerHeader>
            <Divider />
            <List>
                {listNavItems.map((obj, index) => (
                    <ListItem key={obj.itemName} disablePadding className='block' onClick={() => handleClick(obj.itemName)}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                            className=''
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <Icon>{obj.itemIcon}</Icon>
                            </ListItemIcon>
                            <ListItemText primary={obj.itemName} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    )
}

export default NavBar