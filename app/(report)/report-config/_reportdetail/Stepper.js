'use client'
import React, { useEffect } from 'react';
import { useState, useContext } from 'react';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ComboboxComponent from '@/components/base/Combobox';
import { ReportDetailContext } from '@/components/helpers/ReportDetailContext';
import TableComponent from '@/components/base/Table';
import LineChartComponent from '@/components/base/LineChart';
import ColumnChartCompoent from '@/components/base/ColChart';
import ButtonComponent from '@/components/base/Button';

const StepperComponent = (props) => {
    let chart_id = props.stpChartId;

    let { reportsInfo, setReportsInfo } = useContext(ReportDetailContext);

    let [chartData, setChartData] = useState({ [chart_id]: reportsInfo.charts.find(chart => chart._id === chart_id) });
    let [tableData, setTableData] = useState({ [chart_id]: reportsInfo.tables.find(table => table.chart_id === chart_id) });

    // useEffect(() => {
    //     if (Object.keys(reportsInfo).length !== 0) {
    //         setChartData({ [chart_id]: reportsInfo.charts.find(chart => chart._id === chart_id) });
    //         // setTableData({ [chart_id]: reportsInfo.tables.find(table => table.chart_id === chart_id) });
    //     }
    // }, [])

    const steps = ['Config Charts', 'Config Table', 'Review'];
    const chart_type = ["Column Chart", "Pie Chart", "Line Chart", "Donut Chart"];
    const [activeStep, setActiveStep] = useState(0);
    const [errorData, setErrorData] = useState({});

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
            if (emptyField.length === 0) {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            } else {
                let mapFieldName = {
                    chart_name: "Chart Name",
                    chart_type: "Chart Type",
                    data_source_id: "Chart Data Source"
                }
                let objMess = {};
                emptyField.forEach(field => objMess[field] = `${mapFieldName[field]} cannot be empty!`);
                setErrorData({ ...errorData, ...objMess })
            }
        } else if (activeStep === 1) {
            let emptyField = ["table_title", "data_source_id"].filter(key => checkNull(tableData[chart_id][key]) == false)
            if (emptyField.length === 0) {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            } else {
                let mapFieldName = {
                    table_title: "Table Name",
                    data_source_id: "Table Data Source"
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

    const handleChangeChart = (field_key, value) => {
        setChartData({ ...chartData, [chart_id]: { ...chartData[chart_id], [field_key]: value } });
        setErrorData({ ...errorData, [field_key]: "" })
    }

    const handleChangeTable = (field_key, value) => {
        setTableData({ ...tableData, [chart_id]: { ...tableData[chart_id], [field_key]: value } });
        setErrorData({ ...errorData, [field_key]: "" })
    }

    const handleChangeDataString = (field_key, value) => {
        setChartData({ ...chartData, [chart_id]: { ...chartData[chart_id], [field_key]: value } });
        setTableData({ ...tableData, [chart_id]: { ...tableData[chart_id], [field_key]: value } });
        setErrorData({ ...errorData, [field_key]: "" })
    }

    const showTableData = () => {
        if (activeStep === 1) {
            return (
                <Box>
                    <TextField
                        id={tableData[chart_id]._id}
                        label="Table Title"
                        variant="standard"
                        defaultValue={tableData[chart_id].table_title}
                        sx={{ width: '80%', pb: 5 }}
                        onChange={(e) => handleChangeTable("table_title", e.target.value)}
                        helperText={errorData["table_title"] ? errorData["table_title"] : ""}
                        error={errorData["table_title"] ? true : false}
                    />
                    <ButtonComponent btnType="ReportConfig" btnIcon="Clear" btnLabel="Delete" btnClass='btnClearStep1' onClick={() => { showDeletePopup(chart_id) }} />
                    <TextField
                        id="outlined-multiline-static"
                        label="Table Caption"
                        multiline
                        rows={4}
                        defaultValue={tableData[chart_id].caption}
                        sx={{ width: '100%', pb: 3 }}
                        onChange={(e) => handleChangeTable("caption", e.target.value)}
                        helperText={errorData["caption"] ? errorData["caption"] : ""}
                        error={errorData["caption"] ? true : false}
                    />
                    <ComboboxComponent
                        cbcData={reportsInfo.dataString_demo}
                        cbcLabel="Data Source"
                        cbcType="cbcDataSource"
                        defaultValue={tableData[chart_id].data_source_id}
                        // fncChange={handleChangeTable}
                        errorData={errorData}
                        readOnly={true}
                        disabled={true}
                    />
                </Box>
            )
        }
    }

    const showDemo = () => {
        if (chartData[chart_id].data_source_id && tableData[chart_id].data_source_id && activeStep === 2) {
            return (
                <Box>
                    <ButtonComponent btnType="ReportConfig" btnIcon="Clear" btnLabel="Delete" btnClass='btnClearStep2' onClick={() => { showDeletePopup(chart_id) }} />
                    <p>{chartData[chart_id].chart_name}</p>
                    {showChartDemo(chartData[chart_id])}

                    <p>{tableData[chart_id].table_title}</p>
                    <TableComponent tblType="DemoConfig" tblData={tableData[chart_id]} />
                </Box >
            )
        }
    }

    const showChartDemo = (chartData) => {
        switch (chartData.chart_type) {
            case "Column Chart":
                return (
                    <div>
                        <ColumnChartCompoent pgType="ConfigDemo" chtData={chartData} />
                    </div>
                )
                break;
            case "Pie Chart":
                break;
            case "Line Chart":
                return (
                    <div>
                        <LineChartComponent pgType="ConfigDemo" chtData={chartData} />
                    </div>
                )
            case "Donut Chart":
                break;

        }
    }

    const showDeletePopup = (chart_id) => {
        props.mdFnc(true);
        props.deleteId(chart_id);
    }

    return (
        <Box xs={12} sx={{ backgroundColor: 'white', border: '1px solid black', borderRadius: '4vh', margin: '2vh', height: 'auto', wordBreak: 'break-all', textAlign: 'center' }}>
            <Box sx={{ p: 2, height: '500px' }}>
                <Box sx={{ display: activeStep === 0 ? '' : 'none' }}>
                    <Box>
                        <TextField
                            id={chartData[chart_id]._id}
                            label="Chart Title" variant="standard"
                            defaultValue={chartData[chart_id].chart_name}
                            sx={{ width: '70%', pb: 5 }}
                            onChange={(e) => handleChangeChart("chart_name", e.target.value)}
                            helperText={errorData["chart_name"] ? errorData["chart_name"] : ""}
                            error={errorData["chart_name"] ? true : false}
                        />
                        <ButtonComponent btnType="ReportConfig" btnIcon="Clear" btnLabel="Delete" btnClass='btnClearStep' onClick={() => { showDeletePopup(chart_id) }} />
                    </Box>
                    <ComboboxComponent
                        cbcData={chart_type}
                        cbcLabel="Chart Type"
                        cbcType="cbcChartType"
                        defaultValue={chartData[chart_id].chart_type}
                        fncChange={handleChangeChart}
                        errorData={errorData}
                        readOnly={false}
                    />
                    <ComboboxComponent
                        cbcData={reportsInfo.dataString_demo}
                        cbcLabel="Data Source"
                        cbcType="cbcDataSource"
                        defaultValue={chartData[chart_id].data_source_id}
                        fncChange={handleChangeDataString}
                        errorData={errorData}
                        readOnly={false}
                    />
                </Box>
                <Box sx={{ display: activeStep === 1 ? '' : 'none' }}>
                    {showTableData()}
                </Box>
                <Box sx={{ display: activeStep === 2 ? '' : 'none' }}>
                    {showDemo()}
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
                {activeStep === steps.length - 1 ? (
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
                            <Button onClick={handleNext} >
                                Next
                            </Button>
                        </Box>
                    </React.Fragment>
                )}
            </Box>
        </Box >
    );

};

export default StepperComponent;