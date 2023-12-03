import React, { Component, ReactHTMLElement } from 'react'
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Icon, Drawer as MuiDrawer } from '@mui/material'
import Icons from '@/components/base/Icons'
import Image from 'next/image';
import logoBlue from '@/public/img/logoBlue.png'

type NavbarItem = {
    itemName: string,
    itemIcon: string,
    itemComponent: string
}

type Props = {
    navbarItems?: NavbarItem[],
    selectedComponent: (key: string) => void
}

const listNavItems = [
    {
        itemName: "Report",
        itemIcon: "BarChart",
        itemComponent: "report"
    },
    {
        itemName: "Lucky Wheel",
        itemIcon: "Attractions",
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

    const handleClick = (name: string) => {
        setActiveComponent(name);
        props.selectedComponent(name);
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
            <List
                className='flex flex-col items-center'>
                {listNavItems.map((obj, index) => (
                    <ListItem
                        key={obj.itemName}
                        disablePadding
                        className={`block w-45/50 my-0.5 rounded ${activeComponent == obj.itemComponent ? "bg-primary_blur" : ""}`}
                        onClick={() => handleClick(obj.itemComponent)}
                    >
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                                position: 'relative',
                                '&::before': {
                                    position: 'absolute',
                                    content: '""',
                                    display: 'block',
                                    height: '100%',
                                    width: '0.25rem',
                                    right: '-12px',
                                    borderRadius: '.375rem 0 0 .375rem'
                                }
                            }}
                            className={`${activeComponent == obj.itemComponent || open ? "before:bg-primary" : "before:content-none"}`}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                                className={`${activeComponent == obj.itemComponent ? "text-white" : ""}`}
                            >
                                <Icons iconName={obj.itemIcon} />
                            </ListItemIcon>
                            <ListItemText
                                primary={obj.itemName}
                                sx={{ opacity: open ? 1 : 0, }}
                                primaryTypographyProps={{
                                    sx: {
                                        color: `${activeComponent == obj.itemName ? "white" : "rgba(0, 0, 0, 0.54)"}`,
                                        fontWeight: 600
                                    }
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer >
    )
}

export default NavBar