'use client'
import * as React from 'react';
import { Avatar, Box, Grid, Typography, ImageListItem, ImageListItemBar, Menu, MenuItem, Fade } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import cardImg from '@/public/img/business-report.jpg';
import Image from 'next/image';
import { useRouter } from 'next/navigation'

const CardItemComponent = (props) => {
    const theme = useTheme();
    const router = useRouter();
    const { data } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleViewReportOnclick = (props) => {
        router.push("/report/" + props);
    }

    return (
        <Box sx={{ p: 2.25 }}>
            <Grid container direction="column" sx={{ backgroundColor: 'lightblue', overflow: 'hidden' }}>
                <ImageListItem key={data._id} sx={{ width: '100%', display: 'grid' }}>
                    <Image
                        src={cardImg}
                        alt={data.group_name}
                        loading="lazy"
                        style={{
                            width: '24em',
                            height: 'auto',
                            objectFit: 'contain',
                            display: 'block',
                        }}
                    />
                    <ImageListItemBar
                        title={data.group_name}
                        onClick={handleClick}
                        aria-controls={open ? 'fade-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        actionIcon={
                            <IconButton
                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                            // aria-label={`info about ${item.title}`}
                            >
                                <InfoIcon />
                            </IconButton>
                        }
                    />
                    <Menu
                        id="fade-menu"
                        MenuListProps={{
                            'aria-labelledby': 'fade-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                    >
                        {data.reports.map((row, index) => {
                            return (
                                <MenuItem key={row._id} onClick={() => { handleViewReportOnclick(row._id) }} style={{ width: '23.5em' }}>{row.report_name}</MenuItem>
                            )
                        })}
                    </Menu>
                </ImageListItem>
            </Grid>
        </Box>
    )
}

export default CardItemComponent;