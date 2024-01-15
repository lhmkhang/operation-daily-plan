'use client'
import React, { useEffect } from 'react';

const WineProductionChart = (props) => {
    useEffect(() => {
        // Load Google Charts library dynamically
        const script = document.createElement('script');
        script.src = 'https://www.gstatic.com/charts/loader.js';
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
            // Google Charts loaded, now draw the chart
            google.charts.load('current', { packages: ['corechart'] });
            google.charts.setOnLoadCallback(drawChart);
        };

        // Clean up the script tag when the component unmounts
        return () => {
            document.head.removeChild(script);
        };
    }, []);

    const drawChart = () => {
        // Set Data
        const data = google.visualization.arrayToDataTable([
            ['Country', 'Mhl'],
            ['Italy', 54.8],
            ['France', 48.6],
            ['Spain', 44.4],
            ['USA', 23.9],
            ['Argentina', 14.5],
        ]);

        // Set Options
        const options = {
            is3D: true,
            legend: 'bottom',
        };

        // Draw
        const chart = new google.visualization.PieChart(document.getElementById(props.chartID));
        chart.draw(data, options);
    };

    return (
        <div style={{ width: '100%', maxWidth: '600px', height: '86%', textAlign: 'center' }}>
            <span style={{ color: 'black', backgroundColor: 'white', textAlign: 'center', fontSize: 20 }}>Pie Chart Demo</span>
            <div id={props.chartID} style={{ width: '100%', height: '100%' }}></div>
        </div>
    );
};

export default WineProductionChart;