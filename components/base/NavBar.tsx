import React, { Component, ReactHTMLElement } from 'react'
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Drawer as MuiDrawer, Collapse } from '@mui/material'
import Icons from '@/components/base/Icons'
import Image from 'next/image';
import logoBlue from '@/public/img/logoBlue.png'

type NavbarSubItem = {
    itemName: string,
    itemIcon: string,
    itemComponent: string
}

type NavbarItem = {
    itemName: string,
    itemIcon: string,
    itemComponent: string
    itemType: string
    subItems?: NavbarSubItem[]
}

type Props = {
    navbarItems?: NavbarItem[],
    selectedComponent: (key: string) => void
}

const listNavItems = [
    {
        itemName: "Report",
        itemIcon: "BarChart",
        itemComponent: "report",
        itemType: "single"
    },
    {
        itemName: "Lucky Money",
        itemIcon: "Attractions",
        itemComponent: "lucky_wheel",
        itemType: "single"
    },
    {
        itemName: "Report OKR",
        itemIcon: "DataUsage",
        itemComponent: "report_okr",
        itemType: "single"
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
    const [openSub, setOpenSub] = React.useState("");

    const styleTextEaseInOut = (animate: string) => {
        return {
            transitionTimingFunction: animate === "in" ? 'cubic-bezier(0.4, 0, 1, 1)' : 'cubic-bezier(0, 0, 0.2, 1)',
            transitionDuration: '300ms',
            opacity: animate === "in" ? '1' : '0',
        }
    }

    const handleClick = (name: string, type?: string) => {
        setActiveComponent(name);
        props.selectedComponent(name);
        if (type !== "single") {
            let subState = openSub.includes("open") ? name + "_close" : name + "_open";
            setOpenSub(subState);
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
                    className={`block w-45/50 my-0.5 rounded ${activeComponent == obj.itemComponent ? "bg-primary_blur" : ""}`}
                    onClick={() => handleClick(obj.itemComponent, obj.itemType)}
                >
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5
                        }}
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
                                    color: `${activeComponent == obj.itemComponent ? "white" : "rgba(0, 0, 0, 0.54)"}`,
                                    fontWeight: 600
                                },
                                style: open ? styleTextEaseInOut("in") : styleTextEaseInOut("out")
                            }}
                        />
                        {obj.itemType === "single" || !open ? "" :
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    ml: 'auto',
                                    justifyContent: 'center',
                                    flexDirection: 'right'
                                }}
                                className={`${activeComponent == obj.itemComponent ? "text-white" : ""}`}
                            >
                                <Icons iconName={openSub == obj.itemComponent + "_open" ? "ExpandLess" : "ExpandMore"} />
                            </ListItemIcon>
                        }
                    </ListItemButton>
                </ListItem>
            )
        }
        return result;
    }

    {/* {listNavItems.map((obj, index) => {
                    if (!obj.subItems || obj.subItems?.length === 0) {
                        return (
                            
                        )
                    } else {
                        return (
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <List className='flex flex-col items-center'>
                                    {obj.subItems?.map((subObj, subIndex) => {
                                        return (
                                        )
                                    })}
                                </List>
                            </Collapse>
                        )
                    }
                })} */}

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
                    <p
                        className={`m-0 text-4xl font-bold text-primary`}
                        style={open ? styleTextEaseInOut("in") : styleTextEaseInOut("out")}
                    >
                        DIGI-TEXX
                    </p>
                </div>
            </DrawerHeader>
            <Divider />
            <List className='flex flex-col items-center'>
                {renderNavItems()}
            </List>
        </Drawer >
    )
}

export default NavBar