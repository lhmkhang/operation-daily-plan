'use client'
import React, { useContext } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import style from '../../styles/Combobox.module.css';
import { ReportContext } from '../helpers/ReportContext';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

// const theme = createTheme({
//     components: {
//         MuiOutlinedInput: {
//             styleOverrides: {
//                 notchedOutline: { // Key này tương ứng với class cụ thể của component
//                     // Các style của bạn ở đây
//                     height: '30px',
//                     backgroundColor: 'yellow'
//                     // các style khác...
//                 }
//             }
//         }
//     }
// });

const ComboboxComponent = (props) => {
    const [value, setValue] = React.useState("");
    const [valueSource, setValueSource] = React.useState("");
    const context = useContext(ReportContext);
    const { reports, setReports } = context;

    if (props.cbcType === "cbcChartType") {
        if (props.defaultValue !== undefined && value == "") {
            let index = props.cbcData.findIndex(value => value === props.defaultValue);
            if (index !== -1) {
                setValue(props.cbcData[index]);
            }
        }
        return (
            <Autocomplete
                // id={props.cbcId}
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    setReports({ ...reports, cbcChartType: newValue })
                }}
                className={style[props.cbcType]}
                options={props.cbcData}
                autoHighlight
                defaultChecked
                /* onChange={props.comboboxSelect} */
                size='small'
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={props.cbcLabel}
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                    />
                )}
            />
        );
    } else if (props.cbcType === "cbcDataSource") {
        if (props.defaultValue !== undefined && valueSource == "") {
            let index = props.cbcData.findIndex(value => value._id === props.defaultValue);
            if (index !== -1) {
                setValueSource(props.cbcData[index]);
            }
        }
        return (
            <Autocomplete
                id="data-source"
                value={valueSource}
                onChange={(event, newValue) => {
                    setValueSource(newValue);
                    setReports({ ...reports, cbcDataSource: newValue })
                }}
                options={props.cbcData}
                autoHighlight
                getOptionLabel={(option) => option.name===undefined ? "" : option.name}
                size='small'
                renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                        {option.name}
                    </Box>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={props.cbcLabel}
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                    />
                )}
            />
        )
    }
}

export default ComboboxComponent;