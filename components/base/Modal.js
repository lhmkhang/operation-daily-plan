'use client'
import Modal from '@mui/material/Modal';
import style from '../../styles/Modal.module.css';
import ButtonComponent from '@/components/base/Button';
import DataGridComponent from '@/components/base/DataGrid';
import { useState, useContext } from 'react'
import TextField from '@mui/material/TextField';
import ToastComponent from '@/components/base/Toast';
import { ReportDetailContext } from '@/components/helpers/ReportDetailContext';

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
                                    <ButtonComponent btnType="GeneralButton" btnValue="CONFIRM" onClick={() => { handleConfirm() }} />
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
    } else if (props.mdStype === "DeleteStepper") {
        let chart_id = props.chart_id;
        let { reportsInfo, setReportsInfo } = useContext(ReportDetailContext);

        const handleDeleteConfirm = () => {
            if (reportsInfo.charts) {
                // let chartData = reportsInfo.charts.find(chart => chart._id === chart_id);
                let chartIdx = reportsInfo.charts.findIndex(chart => chart._id === chart_id);
                let tableIdx = reportsInfo.tables.findIndex(table => table.chart_id === chart_id);
                if (reportsInfo.charts[chartIdx].isNew) {
                    reportsInfo.charts.splice(chartIdx, 1);
                    reportsInfo.tables.splice(tableIdx, 1)
                } else {
                    //xoa tren db va refresh lai context
                }
            }
            handleClose();
        }

        return (
            <>
                <Modal
                    open={props.mdStatus}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className={style.addNewModal}>
                        <div className={style.deleteStepperModalDiv}>
                            <h1>Delete Chart</h1>
                            <div className={style.deleteStepperModalBody}>
                                <div className={style.deleteStepperInputGroup}>
                                    <p>Do you want to delete chart #{chart_id}</p>
                                </div>
                            </div>
                            <div style={{ display: 'inline-flex' }}>
                                <div style={{ paddingRight: '1vh' }}>
                                    <ButtonComponent btnType="GeneralButton" btnValue="CONFIRM" onClick={() => { handleDeleteConfirm() }} />
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
    }
}

export default ModalComponent;