'use client'
import React, { useContext } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import style from '../../styles/Combobox.module.css';
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
                    props.fncChange("chart_type", newValue)
                    setValue(newValue);
                    if (newValue) {
                        // setReports({ ...reports, cbcChartType: newValue })
                        props.fncChange("chart_type", newValue)
                    } else {
                        props.fncChange("chart_type", "")
                    }
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
                        helperText={props.errorData["chart_type"] ? props.errorData["chart_type"] : ""}
                        error={props.errorData["chart_type"] ? true : false}
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
                // id="data-source"
                value={valueSource}
                onChange={(event, newValue) => {
                    setValueSource(newValue);
                    if (newValue) {
                        let index = props.cbcData.findIndex(value => value._id === newValue._id);
                        if (index !== -1) {
                            props.fncChange("data_source_id", newValue._id)
                        } else {
                            props.fncChange("data_source_id", "")
                        }
                    } else {
                        props.fncChange("data_source_id", "")
                    }
                    // setReports({ ...reports, cbcDataSource: newValue })
                }}
                options={props.cbcData}
                autoHighlight
                getOptionLabel={(option) => option.name === undefined ? "" : option.name}
                size='small'
                renderOption={(keys, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} key={option.name} {...keys}>
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
                        helperText={props.errorData["data_source_id"] ? props.errorData["data_source_id"] : ""}
                        error={props.errorData["data_source_id"] ? true : false}
                    />
                )}
            />
        )
    }
}

export default ComboboxComponent;