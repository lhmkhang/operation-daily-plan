import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const WineProductionChart = (props) => {
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
                    xAxes: [{
                        ticks: {
                            display: true
                        }
                    }],
                    yAxes: [{
                        display: true,
                        ticks: {
                            beginAtZero: true,
                        }
                    }]
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
};

export default WineProductionChart;