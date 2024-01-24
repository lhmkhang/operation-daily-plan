
import React, { useEffect, Suspense } from 'react'
import style from '@/styles/ReportDetail.module.css';
import ButtonComponent from '@/components/base/Button';
import { useState, useContext } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Box } from '@mui/material';
import { ReportDetailContext } from '@/components/helpers/ReportDetailContext';
import StepperComponent from './Stepper'
import LoadingComponent from '@/components/base/Loading'

const dataString_demo = [
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

const data_demo = {
    charts: [
        {
            "_id": "01",
            "chart_name": "Incident Chart",
            "chart_type": "Column Chart",
            "data_source_id": "01",
            "table_info": {
                "_id": "01",
                "table_title": "Incident Datatable",
                "caption": "abc",
                "data_source_id": "01"
            }
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
    ]
};

const ReportDetailComponent = (props) => {

    let { reportsInfo, setReportsInfo } = useContext(ReportDetailContext);
    let [count, setCount] = useState(0);

    useEffect(() => {
        setReportsInfo(data_demo)
    }, [])

    const [charts, setCharts] = useState(data_demo.charts);
    const [tables, setTables] = useState(data_demo.tables);
    const [isUpdate, setStatus] = useState(false);

    const generateRandomId = () => {
        // Generate a random number between 10000 and 99999
        const randomId = Math.floor(Math.random() * 90000) + 10000;
        return randomId;
    };

    const handleAddChartBtn = () => {
        if (charts.length < 3) {
            const randomId = generateRandomId();
            setCharts([...charts, { _id: randomId, chart_name: "", chart_type: "", data_source_id: "", isNew: true }]);
            setReportsInfo({
                ...reportsInfo,
                charts: [...reportsInfo.charts, { _id: randomId, chart_name: "", chart_type: "", data_source_id: "" }],
                tables: [...reportsInfo.tables, { _id: randomId, chart_id: randomId, table_title: "", caption: "", data_source_id: "" }],
            });
        }
    }

    console.log('====================================');
    console.log(reportsInfo);
    console.log('====================================');

    return (
        <div className={style.contain}>
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
                        {reportsInfo.charts.map(chart =>
                            <Grid xs={12} md={6} xl={4} sx={{ margin: 'auto' }} key={chart._id}>
                                <StepperComponent stpChartId={chart._id} stpData={chart} stpDataSource={dataString_demo} stpUpdate={setCharts} />
                            </Grid>
                        )}
                    </Grid>
                </Suspense>
            </Box>
        </div >
    )

}

export default ReportDetailComponent;