'use client'
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import style from '../../styles/Modal.module.css';
import ButtonComponent from '@/components/base/Button';
import { useState } from 'react'
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import ComboboxComponent from '@/components/base/Combobox';

const ModalComponent = (props) => {
    const handleClose = () => props.mdFnc(false);
    let listGroup = [...new Set(props.cbDataString.map(value => value.Group).flat())];

    const list = ["a", "b", "c", "d", "e", "f"];
    const [createNew, setCreateNew] = useState(false);

    const handleSelect = (e) => {
        setCreateNew(!createNew)
    }

    const renderSearch = () => {
        if (createNew) {
            return (
                <TextField id="txtNewGroup" label="New Group Report" variant="outlined" className={style.inputAddNew} />
            )
        } else {
            return (
                <ComboboxComponent cbcData={listGroup} cbcId="cbcGroupReport" />
            )
        }

    }

    if (props.mdStype === "NewReport") {
        return (
            <Modal
                open={props.mdStatus}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className={style.addNewModal}>
                    <div className={style.addNewModalDiv}>
                        <h1>ADD NEW REPORT</h1>
                        <div className={style.addNewModalBody}>
                            <div className={style.addNewInputGroup}>
                                <TextField id="txtReportName" label="Report Name" variant="outlined" className={style.inputAddNew} />
                            </div>
                            <div className={style.addNewInputGroup}>
                                <div className={style.groupTitle}>
                                    <Stack direction="row" spacing={1} alignItems="center" className={style.slideAddNew}>
                                        <Typography>Add new Group ?</Typography>
                                        <FormControlLabel
                                            control={
                                                <Switch checked={createNew} onChange={handleSelect} name="gilad" />
                                            }
                                        />
                                    </Stack>
                                </div>
                                {renderSearch()}
                            </div>
                            <div className={style.addNewInputGroup}>
                                <TextField id="txtDescription" label="Description" multiline rows={10} className={style.textAreaModal} />
                            </div>
                        </div>
                        <div style={{display: 'inline-flex'}}>
                            <ButtonComponent btnType="NewReport" btnValue="Confirm" onClick={() => { handleClose() }} />
                            <ButtonComponent btnType="NewReport" btnValue="Cancel" onClick={() => { handleClose() }} />
                        </div>
                    </div>
                </div>
            </Modal >
        )
    } else {

    }
}

export default ModalComponent;