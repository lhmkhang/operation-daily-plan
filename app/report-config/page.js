'use client'
import style from '@/styles/ReportConfig.module.css';
import ButtonComponent from '@/components/base/Button';

const ReportConfig = () => {

    return (
        <div className={style.contain}>
            <div className={style.titleDiv}>
                <h3>Recent report</h3>
                <div className={style.middleDiv}></div>
                <ButtonComponent btnType="NewReport" btnValue="NEW REPORT" />
            </div>
            <div>
                <div>
                    <h6>Report 1</h6>
                    <p>20.01.2023</p>
                </div>
            </div>
        </div>
    )
}

export default ReportConfig;