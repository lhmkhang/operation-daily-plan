
import React, { useEffect, Suspense, useState, useContext } from 'react'
import style from '@/styles/ReportDetail.module.css';
import ButtonComponent from '@/components/base/Button';
import Grid from '@mui/material/Unstable_Grid2';
import { Box } from '@mui/material';
import { ReportDetailContext } from '@/components/helpers/ReportDetailContext';
import StepperComponent from './Stepper'
import LoadingComponent from '@/components/base/Loading'
import ModalComponent from '@/components/base/Modal';

const data_demo = {
    charts: [
        {
            "_id": "01",
            "chart_name": "Incident Chart",
            "chart_type": "Column Chart",
            "data_source_id": "01",

        }
    ],
    tables: [
        {
            "_id": "01",
            "chart_id": "01",
            "table_title": "Incident Datatable",
            "caption": "abc",
            "data_source_id": "01"
        }
    ],
    dataString_demo: [
        {
            "_id": "01",
            "name": "Migration_Report_Data",
            "dataString": `[{"Quarter": "1","Actual": "10","Expect": "15","Expect%": "80%","Actual%": "67%","Archirved": "83.75%"},{"Quarter": "2","Actual": "11","Expect": "15","Expect%": "80%","Actual%": "73%","Archirved": "91.25%"},{"Quarter": "3","Actual": "12","Expect": "15","Expect%": "80%","Actual%": "80%","Archirved": "100%"},{"Quarter": "4","Actual": "13","Expect": "15","Expect%": "80%","Actual%": "87%","Archirved": "108.75%"}]`
        },
        {
            "_id": "02",
            "name": "Migration_Report_Data_v02",
            "dataString": `[{"Quarter": "1st","Actual": "10","Expect": "15","Expect%": "80%","Actual%": "67%","Archirved": "83.75%"},{"Quarter": "2nd","Actual": "11","Expect": "15","Expect%": "80%","Actual%": "73%","Archirved": "91.25%"},{"Quarter": "3rd","Actual": "12","Expect": "15","Expect%": "80%","Actual%": "80%","Archirved": "100%"},{"Quarter": "4st","Actual": "13","Expect": "15","Expect%": "80%","Actual%": "87%","Archirved": "108.75%"}]`
        },
    ]
};

const ReportDetailComponent = (props) => {

    let { reportsInfo, setReportsInfo } = useContext(ReportDetailContext);
    const [addNewMododal, setAddNewModal] = useState(false);
    const [deleteChart, setdeleteChartId] = useState();

    useEffect(() => {
        setReportsInfo(data_demo)
    }, [])

    const generateRandomId = () => {
        // Generate a random number between 10000 and 99999
        const randomId = Math.floor(Math.random() * 90000) + 10000;
        return randomId;
    };

    const handleAddChartBtn = () => {
        if (reportsInfo.charts.length < 3) {
            const randomId1 = generateRandomId().toString();
            const randomId2 = generateRandomId().toString();
            setReportsInfo({
                ...reportsInfo,
                charts: [...reportsInfo.charts, { _id: randomId1, chart_name: "", chart_type: "", data_source_id: "", isNew : true }],
                tables: [...reportsInfo.tables, { _id: randomId2, chart_id: randomId1, table_title: "", caption: "", data_source_id: "" }],
            });
        }
    }

    return (
        <div className={style.contain}>
            <ModalComponent mdStype="DeleteStepper" mdStatus={addNewMododal} mdFnc={setAddNewModal} chart_id={deleteChart} />
            <div style={{ width: '100%', height: 'auto', paddingBottom: '2vh' }}>
                <div style={{ display: 'flex' }}>
                    <span style={{ width: '10%' }}>REPORT CONFIG {props.report_id}</span>
                    <div style={{ width: '70%' }}></div>
                    <div style={{ width: '10%' }}>
                        <ButtonComponent btnType="GeneralButton" btnValue="New Data Source" onClick={() => { }} />
                    </div>
                    <div>
                        <ButtonComponent btnType="GeneralButton" btnValue="New DRO Data" onClick={() => { }} />
                    </div>
                </div>
            </div>
            <div style={{ width: "100%", height: "auto", borderColor: "blue", paddingBottom: '2vh' }}>
                <div style={{ display: '-webkit-flex' }}>
                    <ButtonComponent btnType="AddButton" btnValue="Add Chart" onClick={() => { handleAddChartBtn() }} />
                </div>
            </div>

            <Box sx={{ flexGrow: 1, backgroundColor: 'lightgray' }}>
                <Suspense fallback={<LoadingComponent />}>
                    <Grid container>
                        {reportsInfo.charts && Array.isArray(reportsInfo.charts) && reportsInfo.charts.map(chart =>
                            <Grid xs={12} md={6} xl={4} sx={{ margin: 'auto' }} key={chart._id}>
                                <StepperComponent stpChartId={chart._id} mdFnc={setAddNewModal} deleteId ={setdeleteChartId}/>
                            </Grid>
                        )}
                    </Grid>
                </Suspense>
            </Box>
        </div >
    )

}

export default ReportDetailComponent;