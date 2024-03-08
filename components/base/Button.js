import React from 'react';
import IconComponent from '@/components/base/Icon';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import style from '../../styles/Button.module.css'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

const ButtonComponent = (props) => {
    //props = {btnType, btnValue, btnLabel}

    if (props.btnType === "GeneralButton") {
        return (
            <Button className={style.btnGeneral} onClick={props.onClick}>
                {props.btnValue}
            </Button>
        );
    } else if (props.btnType === "ReportConfig") {
        return (
            <Tooltip title={props.btnLabel} className={style[props.btnClass]} onClick={props.onClick}>
                <IconButton aria-label={props.btnLabel}>
                    <IconComponent iconName={props.btnIcon} size='normal' />
                </IconButton>
            </Tooltip>
        )
    } else if (props.btnType === "AddButton") {
        return (
            <Button color="primary" startIcon={< AddIcon />} onClick={props.onClick} className={style.btnAdd}>
                {props.btnValue}
            </Button >
        )
    } else {
        // thêm các nút cho các btnType khác nhau
    }

};

export default ButtonComponent;