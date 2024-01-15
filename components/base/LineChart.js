'use client'
import React from 'react';
import { Line } from 'react-chartjs-2';

const MyChart = () => {
    const xValues = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

    const data = {
        labels: xValues,
        datasets: [
            {
                label: 'Dataset 1',
                data: [860, 1140, 1060, 1060, 1070, 1110, 1330, 2210, 7830, 2478],
                borderColor: 'red',
                fill: false,
            },
            {
                label: 'Dataset 2',
                data: [1600, 1700, 1700, 1900, 2000, 2700, 4000, 5000, 6000, 7000],
                borderColor: 'green',
                fill: false,
            },
            {
                label: 'Dataset 3',
                data: [300, 700, 2000, 5000, 6000, 4000, 2000, 1000, 200, 100],
                borderColor: 'blue',
                fill: false,
            },
        ],
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Line Chart Demo',
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
        <div style={{ width: '100%', maxWidth: '600px' }}>
            <Line data={data} options={options} />
        </div>
    );
};

export default MyChart;