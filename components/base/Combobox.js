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
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={props.cbcLabel}
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                        helperText={props.errorData["chart_type"] ? props.errorData["chart_type"] : null}
                        error={props.errorData["chart_type"] ? true : false}
                    />
                )}
            />
        );
    } else if (props.cbcType === "cbcDataSource") {

        const { cbcData, cbcLabel, defaultValue, errorData, readOnly, fncChange, disabled } = props;

        if (defaultValue !== undefined && valueSource == "") {
            let index = cbcData.findIndex(value => value._id === defaultValue);
            if (index !== -1) {
                setValueSource(cbcData[index]);
            }
        }

        return (
            <Autocomplete
                // id="data-source"
                value={valueSource}
                onChange={(event, newValue) => {
                    setValueSource(newValue);
                    if (newValue) {
                        let index = cbcData.findIndex(value => value._id === newValue._id);
                        if (index !== -1) {
                            fncChange("data_source_id", newValue._id)
                        } else {
                            fncChange("data_source_id", "")
                        }
                    } else {
                        fncChange("data_source_id", "")
                    }
                    // setReports({ ...reports, cbcDataSource: newValue })
                }}
                options={cbcData}
                disabled={disabled}
                autoHighlight
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.name === undefined ? "" : option.name}
                size='small'
                renderOption={(propOps, option) => {
                    if (!readOnly) {
                        const { key, ...restProps } = propOps; // Extract 'key' from propOps
                        return (
                            <Box
                                component="li"
                                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                key={key}
                                {...restProps} // Spread the rest of the props
                            >
                                {option.name}
                            </Box>
                        );
                    }
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={cbcLabel}
                        key={cbcLabel}
                        inputProps={{
                            ...params.inputProps,
                            readOnly: readOnly,
                            disabled: disabled,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                        helperText={errorData["data_source_id"] ? errorData["data_source_id"] : null}
                        error={errorData["data_source_id"] ? true : false}
                    />
                )}
            />
        )
    }
}

export default ComboboxComponent;