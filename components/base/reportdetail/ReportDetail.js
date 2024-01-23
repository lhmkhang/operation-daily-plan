
import React from 'react'
import { styled } from '@mui/material/styles';
import style from '@/styles/ReportDetail.module.css';
import ButtonComponent from '@/components/base/Button';
import ComboboxComponent from '@/components/base/Combobox';
import { useState, useContext } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ReportContext } from '@/components/helpers/ReportContext';

const steps = ['Config Charts', 'Config Table', 'Review'];
const chart_type = ["Column Chart", "Pie Chart", "Line Chart", "Donut Chart"];

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

const data_demo = [
    {
        "_id": "01",
        "chart_name": "Incident Chart",
        "chart_type": "Column Chart",
        "data_source_id": "01",
        "table_info": {
            "table_name": "Incident Datatable",
            "caption": "abc",
            "data_source_id": "01"
        }
    }
];

const ReportDetailComponent = (props) => {
    let context = useContext(ReportContext);
    let { reports, setReports } = context;
    setReports(data_demo)
    console.log('====================================');
    console.log(reports);
    console.log('====================================');
    const [charts, setCharts] = useState(data_demo);
    const [activeStep, setActiveStep] = React.useState(0);
    const [isUpdate, setStatus] = React.useState(false);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleAddChartBtn = () => {
        if (charts.length < 3) {
            setCharts([...charts, { _id: "", chart_name: "" }]);
        }
    }

    const handleSave = () => {
        setActiveStep(0);
    };

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
                <Grid container>
                    {charts.map(chart =>
                        <Grid xs={12} md={6} xl={4} sx={{ margin: 'auto' }}>
                            <Box xs={12} sx={{ backgroundColor: 'white', border: '1px solid black', borderRadius: '4vh', margin: '2vh', height: 'auto', wordBreak: 'break-all', textAlign: 'center' }}>
                                <Box sx={{ p: 2, height: '500px' }}>
                                    <Box sx={{ display: activeStep === 0 ? '' : 'none' }}>
                                        <TextField id="standard-basic" label="Chart Title" variant="standard" defaultValue={chart.chart_name} sx={{ width: '80%', pb: 5 }} />
                                        <ComboboxComponent cbcData={chart_type} cbcLabel="Select Chart Type" cbcType="cbcChartType" defaultValue={chart.chart_type} />
                                        <ComboboxComponent cbcData={dataString_demo} cbcLabel="Select Data Source" cbcType="cbcDataSource" defaultValue={chart.data_source_id} />
                                    </Box>
                                    <Box sx={{ display: activeStep === 1 ? '' : 'none' }}>
                                        <TextField id="standard-basic" label="Table Title" variant="standard" sx={{ width: '80%', pb: 5 }} />
                                        <TextField id="standard-basic" label="Table Title" variant="standard" sx={{ width: '80%', pb: 5 }} />
                                        <ComboboxComponent cbcData={dataString_demo} cbcLabel="Select Data Source" cbcType="cbcDataSource" />
                                    </Box>
                                </Box>
                                <Box sx={{ p: 2 }}>
                                    <Stepper activeStep={activeStep} alternativeLabel>
                                        {steps.map((label, index) => {
                                            const stepProps = {};
                                            const labelProps = {};
                                            return (
                                                <Step key={label} {...stepProps}>
                                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                                </Step>
                                            );
                                        })}
                                    </Stepper>
                                    {activeStep === steps.length ? (
                                        <React.Fragment>
                                            <Typography sx={{ mt: 2, mb: 1 }}>
                                                All steps completed - you&apos;re finished
                                            </Typography>
                                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                                <Box sx={{ flex: '1 1 auto' }} />
                                                <Button onClick={handleSave}>Save</Button>
                                            </Box>
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                                <Button
                                                    color="inherit"
                                                    disabled={activeStep === 0}
                                                    onClick={handleBack}
                                                    sx={{ mr: 1 }}
                                                >
                                                    Back
                                                </Button>
                                                <Box sx={{ flex: '1 1 auto' }} />
                                                <Button onClick={handleNext} disabled={activeStep === steps.length - 1}>
                                                    Next
                                                </Button>
                                            </Box>
                                        </React.Fragment>
                                    )}
                                </Box>
                            </Box>

                        </Grid>
                    )}
                </Grid>
            </Box>
        </div >
    )

}

export default ReportDetailComponent;