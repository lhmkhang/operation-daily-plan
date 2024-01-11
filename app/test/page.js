'use client'
import TextField from '@mui/material/TextField';
import { setTheme } from '@/lib/redux/slices/themeSlice/themeSlice';
import { useDispatch } from 'react-redux';

const Test = () => {
    const dispatch = useDispatch();
    return (
        <TextField onChange={(e) => {
            dispatch(setTheme({
                name: e.target.value
            }))
        }} />


    )
}

export default Test;