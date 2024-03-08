import React, { useEffect, useContext, useRef } from 'react';
import Chart from 'chart.js/auto';
import { ReportDetailContext } from '@/components/helpers/ReportDetailContext';

const ColumnChartComponent = (props) => {
    if (props.pgType === "HomeDemo") {
        useEffect(() => {
            const xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
            const yValues = [55, 49, 44, 24, 15];
            const barColors = ["red", "green", "blue", "orange", "brown"];

            const canvas = document.getElementById(props.chartID);

            if (!canvas) {
                console.error("Canvas element not found.");
                return;
            }

            const newChart = new Chart(canvas, {
                type: 'bar',
                data: {
                    labels: xValues,
                    datasets: [
                        {
                            label: "Expect",
                            backgroundColor: barColors,
                            borderColor: "rgba(54, 162, 235, 1)",
                            borderWidth: 1,
                            data: yValues,
                            barPercentage: 0.8,
                            categoryPercentage: 0.5,
                        },
                        {
                            label: "Actual",
                            backgroundColor: barColors,
                            borderColor: "rgba(255, 159, 64, 1)",
                            borderWidth: 1,
                            data: yValues,
                            barPercentage: 0.8,
                            categoryPercentage: 0.5,
                        }]
                },
                options: {
                    scales: {
                        x: {
                            ticks: {
                                display: true
                            }
                        },
                        y: {
                            display: true,
                            ticks: {
                                beginAtZero: true,
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: true,
                            position: "bottom"
                        },
                        title: {
                            display: true,
                            text: "Column Chart Demo",
                            fontSize: 25,
                            fontColor: "blue",
                            fontWeight: "bold",
                            padding: 40
                        },
                    },
                    hover: {
                        animationDuration: 0,
                    },
                }
            });

            return () => {
                newChart.destroy();
            };
        }, [props.chartID]);

        return (
            <div style={{ width: '100%', maxWidth: '600px' }}>
                <canvas id={props.chartID}></canvas>
            </div>
        );
    } else if (props.pgType === "ConfigDemo") {
        let { reportsInfo } = useContext(ReportDetailContext);
        const canvasRef = useRef(null);
        const chartRef = useRef(null);

        const chtData = props.chtData;
        const chtStringData = reportsInfo.dataString_demo.find(item => item._id === chtData.data_source_id);
        const chtDataInfo = chtStringData ? JSON.parse(chtStringData.dataString) : [];

        let actual = [];
        let expect = [];
        let labelValue = [];
        chtDataInfo.forEach(element => {
            actual.push(element.Actual);
            expect.push(element.Expect);
            labelValue.push("Quarter " + element.Quarter)
        });

        useEffect(() => {
            const createChart = () => {
                const canvas = canvasRef.current;

                if (!canvas) {
                    console.error("Canvas element not found.");
                    return;
                }

                // Destroy the existing chart if it exists
                if (chartRef.current) {
                    chartRef.current.destroy();
                }

                const newChart = new Chart(canvas, {
                    type: 'bar',
                    data: {
                        labels: labelValue,
                        datasets: [
                            {
                                label: "Actual",
                                backgroundColor: "red",
                                borderColor: "rgba(54, 162, 235, 1)",
                                borderWidth: 1,
                                data: actual,
                                barPercentage: 0.8,
                                categoryPercentage: 0.5,
                            },
                            {
                                label: "Expect",
                                backgroundColor: "blue",
                                borderColor: "rgba(255, 159, 64, 1)",
                                borderWidth: 1,
                                data: expect,
                                barPercentage: 0.8,
                                categoryPercentage: 0.5,
                            }]
                    },
                    options: {
                        scales: {
                            x: {
                                ticks: {
                                    display: true
                                }
                            },
                            y: {
                                display: true,
                                ticks: {
                                    beginAtZero: true,
                                }
                            }
                        },
                        plugins: {
                            legend: {
                                display: true,
                                position: "bottom"
                            }
                        },
                        hover: {
                            animationDuration: 0,
                        },
                    }
                });

                // Save the chart reference for future use
                chartRef.current = newChart;

                return () => {
                    newChart.destroy();
                };
            }

            createChart();

        }, [canvasRef, chartRef, chtDataInfo]);

        return (
            <div style={{ width: '100%', maxWidth: '600px' }}>
                <canvas ref={canvasRef} id={chtData._id}></canvas>
            </div>
        );
    }
};

export default ColumnChartComponent;