'use client'
import Modal from '@mui/material/Modal';
import style from '../../styles/Modal.module.css';
import ButtonComponent from '@/components/base/Button';
import DataGridComponent from '@/components/base/DataGrid';
import { useState } from 'react'
import TextField from '@mui/material/TextField';
import ToastComponent from '@/components/base/Toast';

const ModalComponent = (props) => {
    const [reportData, setReportData] = useState([]);
    const [isError, setError] = useState("");

    const handleClose = () => {
        props.mdFnc(false);
    }
    const errorString = props.responseStr;
    const status = 200//props.responseStatus;

    const handleConfirm = () => {
        if (status === 200) {
            console.log('====================================');
            console.log(reportData);
            console.log('====================================');
            /*Persist reportData*/
            handleClose();
        }
    }

    if (props.mdStype === "NewReport") {
        return (
            <>
                <Modal
                    open={props.mdStatus}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className={style.addNewModal}>
                        <div className={style.addNewModalDiv}>
                            <h1>ADD NEW REPORT</h1>
                            <div className={style.addNewModalBody}>
                                <div className={style.addNewInputGroup}>
                                    <div className={style.groupInput}>
                                        <TextField id="txtNewGroup" label="New Group Report" variant="outlined" className={style.inputAddNew} />
                                    </div>
                                    <span className={style.errorString} style={errorString !== undefined ? { opacity: 1 } : { opacity: 0 }}>{errorString}</span>
                                </div>
                                <div className={style.addNewInputGroup}>
                                    <TextField id="txtDescription" label="Description" multiline rows={6} className={style.textAreaModal} />
                                </div>
                                <div className={style.addNewInputGroup}>
                                    <DataGridComponent setErrorStr={setError} />
                                </div>
                            </div>
                            <div style={{ display: 'inline-flex' }}>
                                <div style={{ paddingRight: '1vh' }}>
                                    <ButtonComponent btnType="GeneralButton" btnValue="CONFIRM" onclick={() => { handleConfirm() }} />
                                </div>
                                <div>
                                    <ButtonComponent btnType="GeneralButton" btnValue="CANCEL" onClick={() => { handleClose() }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal >
                <ToastComponent toastDisplay={isError === "" ? "hidden" : "show"} toastMessage={isError === "" ? "" : isError} />
            </>

        )
    } else {

    }
}

export default ModalComponent;