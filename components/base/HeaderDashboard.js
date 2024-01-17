'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import style from '@/styles/Header.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {clearAuthInfo} from '@/lib/redux/slices/authSlice/authSlice';


const settings = ['User Profile', 'Account Setting', 'Logout'];

function ResponsiveAppBar() {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const userInfo = useSelector(state => state.auth.userInfo);
    const dispatch = useDispatch();

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleHeaderOps = (setting) => {
        if (anchorElUser != null && setting === "Logout") {
            dispatch(clearAuthInfo());
        }
    }

    return userInfo ? (
        <AppBar position="static" className={style.headerMain}>
            <Container maxWidth="xl" className={style.headerContainer}>
                <Toolbar disableGutters>
                    <div className={style.avatarDiv}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} className={style.avatarButton}>
                                <Avatar alt={userInfo.username} className={style.avatar} />
                                <p>{userInfo.roles.fullName}</p>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '4.5vh' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} style={{ width: '25vh' }} onClick={() => { handleHeaderOps(setting) }}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    ) : (null);
}
export default ResponsiveAppBar;