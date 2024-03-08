'use client'
import React, { useEffect, useRef, useState, useContext } from 'react';
import { AppBar, Box, Toolbar, Container, Button, Fade, Menu, MenuItem } from '@mui/material';
import { ReportNarbarContext } from '@/components/helpers/ReportNarbarContext';
import style from '@/styles/Narbar.module.css';
import ButtonComponent from '@/components/base/Button';
import { useRouter } from 'next/navigation'

const NarbarComponent = () => {
    const containerRef = useRef(null);
    const { reportsNarbar } = useContext(ReportNarbarContext);
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState({});
    const handleClick = (itemId, event) => {
        setAnchorEl({
            ...anchorEl,
            [itemId]: event.currentTarget,
        });
    };

    const handleClose = (itemId) => {
        setAnchorEl({
            ...anchorEl,
            [itemId]: null,
        });
    };

    const handleViewReportOnclick = (props) => {
        router.push("/report/" + props);
    };

    const handleScroll = (direction) => {
        const container = containerRef.current;
        const step = 100; // Adjust the step as needed
        if (container) {
            if (direction === 'left') {
                container.scrollTo({
                    left: container.scrollLeft - step,
                    behavior: 'smooth',
                });
            } else {
                container.scrollTo({
                    left: container.scrollLeft + step,
                    behavior: 'smooth',
                });
            }
        }
    };

    return (
        <AppBar position="static" className={style.mainContainer}>
            <Container
                maxWidth="100%"
                disableGutters
            >
                <Toolbar disableGutters>
                    <ButtonComponent btnType="ReportConfig" btnIcon="ArrowBackIos" btnLabel="Left" btnClass='btnLeft' onClick={() => handleScroll('left')} />
                    <Box
                        ref={containerRef}
                        className={style.mainNarbar}
                    >
                        {reportsNarbar && Array.isArray(reportsNarbar) && reportsNarbar.map(items =>
                            <Box className={style.itemBox} key={items._id}>
                                <Button
                                    className={style.itemNarbar}
                                    onClick={(event) => handleClick(items._id, event)}
                                    aria-controls={anchorEl[items._id] ? 'fade-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={anchorEl[items._id] ? 'true' : undefined}
                                >
                                    {items.group_name}
                                </Button>
                                <Menu
                                    id="fade-menu"
                                    MenuListProps={{
                                        'aria-labelledby': 'fade-button',
                                    }}
                                    anchorEl={anchorEl[items._id]}
                                    open={Boolean(anchorEl[items._id])}
                                    onClose={() => handleClose(items._id)}
                                    TransitionComponent={Fade}
                                >
                                    {items.reports.map((row, index) => (
                                        <MenuItem key={row._id} onClick={() => { handleViewReportOnclick(row._id) }} className={style.itemMenu}>
                                            {row.report_name}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                        )}
                    </Box>
                    <ButtonComponent btnType="ReportConfig" btnIcon="ArrowForwardIos" btnLabel="Right" btnClass='btnRight' onClick={() => handleScroll('right')} />
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default NarbarComponent;