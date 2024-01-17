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
            <button className={style.btnAdd}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125" stroke="#fffffff" strokeWidth="2"></path>
                    <path d="M17 15V18M17 21V18M17 18H14M17 18H20" stroke="#fffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
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