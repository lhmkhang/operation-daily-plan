'use client'
import style from '@/styles/Home.module.css';
import PieChartComponent from '@/components/base/PieChart';
import ColumnChartCompoent from '@/components/base/ColChart';
import LineChartComponent from '@/components/base/LineChart'
import DonutChartComponent from '@/components/base/DonutChart'
import Error from 'next/error';

const HomePage = () => {

    return (
        <div className={style.mainDiv}>
            <div className={style.lineDiv}>
                <div className={style.chartDiv}>
                    <PieChartComponent chartID='1' />
                </div>
                <div className={style.chartDiv}>
                    <ColumnChartCompoent chartID='2' />
                </div>
            </div>
            <div className={style.lineDiv}>
                <div className={style.chartDiv}>
                    <LineChartComponent />
                </div>
                <div className={style.chartDiv}>
                    <DonutChartComponent />
                </div>
            </div>

        </div>
    )
}

export default HomePage;