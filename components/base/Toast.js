'use client'
import style from '../../styles/Toast.module.css';

const ToastComponent = (props) => {
    //props = {toastDisplay, toastMessage}

    return (
        <div id="snackbar" className={props.toastDisplay === "show" ? style.show : ""}>{props.toastMessage}</div>
    )
};

export default ToastComponent;