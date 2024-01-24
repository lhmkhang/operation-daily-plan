'use client'
import React from 'react';
import { useState, useContext } from 'react';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ComboboxComponent from '@/components/base/Combobox';

const StepperComponent = (props) => {
    const steps = ['Config Charts', 'Config Table', 'Review'];
    const chart_type = ["Column Chart", "Pie Chart", "Line Chart", "Donut Chart"];
    let chart_id = props.stpData._id;
    //props = {btnType, btnValue, btnLabel}
    const [activeStep, setActiveStep] = React.useState(0);
    const [chartData, setCharData] = React.useState({ [chart_id]: props.stpData });
    const [errorData, setErrorData] = React.useState({});

    const checkNull = (value) => {
        if (value === "" || value === undefined) {
            return false;
        } else {
            return true;
        }
    }

    const handleNext = () => {
        if (activeStep === 0) {
            let emptyField = ["chart_name", "chart_type", "data_source_id"].filter(key => checkNull(chartData[chart_id][key]) == false)
            console.log('==================Empty Field==================');
            // console.log(chartData[chart_id][data_source_id]);
            console.log(emptyField);
            console.log('====================================');
            if (emptyField.length === 0) {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            } else {
                let mapFieldName = {
                    chart_name: "Chart Name",
                    chart_type: "Chart Type",
                    data_source_id: "Data Source"
                }
                let objMess = {};
                emptyField.forEach(field => objMess[field] = `${mapFieldName[field]} cannot be empty!`);
                setErrorData({ ...errorData, ...objMess })
            }
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSave = () => {
        setActiveStep(0);
    };

    const handleChange = (field_key, value) => {
        let chart_id = props.stpData._id;
        setCharData({ ...chartData, [chart_id]: { ...chartData[chart_id], [field_key]: value } });
        setErrorData({ ...errorData, [field_key]: "" })
        console.log('==================Onchange==================');
        console.log(errorData);
        console.log(field_key);
        console.log(value);
        console.log('====================================');
    }

    return (
        <Box xs={12} sx={{ backgroundColor: 'white', border: '1px solid black', borderRadius: '4vh', margin: '2vh', height: 'auto', wordBreak: 'break-all', textAlign: 'center' }}>
            <Box sx={{ p: 2, height: '500px' }}>
                <Box sx={{ display: activeStep === 0 ? '' : 'none' }}>
                    <TextField
                        id={props.stpData._id}
                        label="Chart Title" variant="standard"
                        defaultValue={props.stpData.chart_name}
                        sx={{ width: '80%', pb: 5 }}
                        onChange={(e) => handleChange("chart_name", e.target.value)}
                        helperText={errorData["chart_name"] ? errorData["chart_name"] : ""}
                        error={errorData["chart_name"] ? true : false}
                    />
                    <ComboboxComponent
                        cbcData={chart_type}
                        cbcLabel="Chart Type"
                        cbcType="cbcChartType"
                        defaultValue={props.stpData.chart_type}
                        fncChange={handleChange}
                        errorData={errorData}
                    />
                    <ComboboxComponent
                        cbcData={props.stpDataSource}
                        cbcLabel="Data Source"
                        cbcType="cbcDataSource"
                        defaultValue={props.stpData.data_source_id}
                        fncChange={handleChange}
                        errorData={errorData}
                    />
                </Box>
                <Box sx={{ display: activeStep === 1 ? '' : 'none' }}>
                    <TextField
                        id="standard-basic"
                        label="Table Title"
                        variant="standard"
                        defaultValue={props.stpData.table_info.table_title}
                        sx={{ width: '80%', pb: 5 }}
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Table Caption"
                        multiline
                        rows={4}
                        defaultValue={props.stpData.table_info.caption}
                        sx={{ width: '100%', pb: 3 }}
                    />
                    <ComboboxComponent
                        cbcData={props.stpDataSource}
                        cbcLabel="Data Source"
                        cbcType="cbcDataSource"
                        defaultValue={props.stpData.table_info.data_source_id}
                        fncChange={handleChange}
                        errorData={errorData}
                    />
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
    );

};

export default StepperComponent;