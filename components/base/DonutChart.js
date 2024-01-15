'use client'
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const DonutChart = () => {
    const xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
    const yValues = [55, 49, 44, 24, 15];
    const barColors = ["#b91d47", "#00aba9", "#2b5797", "#e8c3b9", "#1e7145"];

    const data = {
        labels: xValues,
        datasets: [
            {
                backgroundColor: barColors,
                data: yValues,
            },
        ],
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Demo Donut Chart',
                fontSize: 20,
                fontColor: 'black',
                padding: {
                    top: 10,
                    bottom: 30,
                },
            },
            legend: {
                display: true,
                position: 'bottom',
            },
        },
    };

    return (
        <div style={{ width: 'auto', maxHeight: '400px' }}>
            <Doughnut data={data} options={options} />
        </div>
    );
};

export default DonutChart;