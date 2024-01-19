import React, { useEffect } from 'react';
import IconComponent from '@/components/base/Icon';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import style from '../../styles/Button.module.css'

const ButtonComponent = (props) => {
    //props = {btnType, btnValue, btnLabel}
    const btnClass = props.btnClass;

    if (props.btnType === "NewReport") {
        return (
            <button className={style.btnAdd} onClick={props.onClick}>
                {props.btnValue}
            </button>
        );
    } else if (props.btnType === "ReportConfig") {
        return (
            <Tooltip title={props.btnLabel} className={style[btnClass]}>
                <IconButton aria-label={props.btnLabel}>
                    <IconComponent iconName={props.btnValue} size='normal' />
                </IconButton>
            </Tooltip>
        )
    } else {
        // thêm các nút cho các btnType khác nhau
    }

};

export default ButtonComponent;