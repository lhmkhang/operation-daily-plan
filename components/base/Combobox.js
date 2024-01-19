
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import style from '../../styles/Combobox.module.css';

const ComboboxComponent = (props) => {
    return (
        <Autocomplete
            id={props.cbcId}
            className={props.cbcType === 'SearchTable' ? style.tableSearch : style.modalGroup}
            options={props.cbcData}
            autoHighlight
            /* onChange={props.comboboxSelect} */
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Choose Group"
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                />
            )}
        />
    );
}

export default ComboboxComponent;