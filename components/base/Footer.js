'use client'
import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { useSelector } from 'react-redux';

export default function Footer() {
    const userInfo = useSelector(state => state.auth.userInfo);

    return userInfo ? (
        <Box
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[800],
                p: 0,
                height: 'auto'
            }}
            component="footer"
        >
            <Container maxWidth="sm">
                <Typography variant="body2" color="text.secondary" align="center">
                    {"Design By OPS Design Team."}
                </Typography>
            </Container>
        </Box>
    ) : (null);
}