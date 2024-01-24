'use client'
import style from '@/styles/ReportConfig.module.css';
import ButtonComponent from '@/components/base/Button';
import TableComponent from '@/components/base/Table';
import ModalComponent from '@/components/base/Modal';

import { useState } from 'react'


const jsonData = [
    {
        "_id": "01",
        "group_name": "Maximize Efficiency Report",
        "description": "",
        "user_create": "loilm",
        "date_create": "01.12.2023",
        "reports": [
            {
                "_id": "01",
                "report_name": "Maximize Efficiency Report",
                "user_create": "loilm",
                "date_create": "01.12.2023",
                "description": "Maximize Efficiency Report For Q3, Q4 2023"
            }
        ],
    },
    {
        "_id": "02",
        "group_name": "Customer Satisfaction Report",
        "description": "",
        "user_create": "loilm",
        "date_create": "01.12.2023",
        "reports": [
            {
                "_id": "02",
                "report_name": "Customer Satisfaction Report",
                "user_create": "loilm",
                "date_create": "01.12.2023",
                "description": "Customer Satisfaction Report For Q3, Q4 2023"
            }
        ],
    },
    {
        "_id": "03",
        "group_name": "Internal Process Improvement Report",
        "description": "",
        "user_create": "loilm",
        "date_create": "01.12.2023",
        "reports": [
            {
                "_id": "03",
                "report_name": "Project Design Report",
                "user_create": "loilm",
                "date_create": "01.12.2023",
                "description": "Project Design Report For Q3, Q4 2023"
            },
            {
                "_id": "04",
                "report_name": "Incident Report",
                "user_create": "loilm",
                "date_create": "01.12.2023",
                "description": "Incident Report For Q3, Q4 2023"
            },
            {
                "_id": "05",
                "report_name": "Task Manual Report",
                "user_create": "loilm",
                "date_create": "01.12.2023",
                "description": "Task Manual Report For Q3, Q4 2023"
            },
            {
                "_id": "06",
                "report_name": "Improvement Ideas Report",
                "user_create": "loilm",
                "date_create": "01.12.2023",
                "description": "Improvement Ideas Report For Q3, Q4 2023"
            }
        ],
    },
    {
        "_id": "04",
        "group_name": "Internal Process Improvement Report 1",
        "description": "",
        "user_create": "loilm",
        "date_create": "01.12.2023",
        "reports": [
            {
                "_id": "07",
                "report_name": "Project Design Report 1",
                "user_create": "loilm",
                "date_create": "01.12.2023",
                "description": "Project Design Report For Q3, Q4 2023"
            },
            {
                "_id": "08",
                "report_name": "Incident Report 1",
                "user_create": "loilm",
                "date_create": "01.12.2023",
                "description": "Incident Report For Q3, Q4 2023"
            },
            {
                "_id": "09",
                "report_name": "Task Manual Report 1",
                "user_create": "loilm",
                "date_create": "01.12.2023",
                "description": "Task Manual Report For Q3, Q4 2023"
            },
            {
                "_id": "10",
                "report_name": "Improvement Ideas Report 1",
                "user_create": "loilm",
                "date_create": "01.12.2023",
                "description": "Improvement Ideas Report For Q3, Q4 2023"
            }
        ],
    },
    {
        "_id": "05",
        "group_name": "Internal Process Improvement Report 2",
        "description": "",
        "user_create": "loilm",
        "date_create": "01.12.2023",
        "reports": [
            {
                "_id": "11",
                "report_name": "Project Design Report 2",
                "user_create": "loilm",
                "date_create": "01.12.2023",
                "description": "Project Design Report For Q3, Q4 2023"
            },
            {
                "_id": "12",
                "report_name": "Incident Report 2",
                "user_create": "loilm",
                "date_create": "01.12.2023",
                "description": "Incident Report For Q3, Q4 2023"
            },
            {
                "_id": "13",
                "report_name": "Task Manual Report 2",
                "user_create": "loilm",
                "date_create": "01.12.2023",
                "description": "Task Manual Report For Q3, Q4 2023"
            },
            {
                "_id": "14",
                "report_name": "Improvement Ideas Report 2",
                "user_create": "loilm",
                "date_create": "01.12.2023",
                "description": "Improvement Ideas Report For Q3, Q4 2023"
            }
        ],
    },
    {
        "_id": "06",
        "group_name": "Internal Process Improvement Report 3",
        "description": "",
        "user_create": "loilm",
        "date_create": "01.12.2023",
        "reports": [
            {
                "_id": "15",
                "report_name": "Project Design Report 3",
                "user_create": "loilm",
                "date_create": "01.12.2023",
                "description": "Project Design Report For Q3, Q4 2023"
            },
            {
                "_id": "16",
                "report_name": "Incident Report 3",
                "user_create": "loilm",
                "date_create": "01.12.2023",
                "description": "Incident Report For Q3, Q4 2023"
            },
            {
                "_id": "17",
                "report_name": "Task Manual Report 3",
                "user_create": "loilm",
                "date_create": "01.12.2023",
                "description": "Task Manual Report For Q3, Q4 2023"
            },
            {
                "_id": "18",
                "report_name": "Improvement Ideas Report 3",
                "user_create": "loilm",
                "date_create": "01.12.2023",
                "description": "Improvement Ideas Report For Q3, Q4 2023"
            }
        ],
    },
]
let listInvisible = ["dateDifference", "reports", "_id"];


// Calculate the difference between the current date and each "Date Create"
jsonData.forEach(item => {
    const createDate = item.date_create;
    const [day, month, year] = createDate.split('.');
    const createDateObject = new Date(`${year}-${month}-${day}`);

    // Check if the parsing is successful
    if (createDateObject !== "InvalidDate") {
        item.dateDifference = (Math.abs(createDateObject - new Date()) / 1000 / 3600 / 24).toFixed();
    } else {
        // Set dateDifference to NaN in case of parsing error
        item.dateDifference = NaN;
    }
});

// Filter out objects with NaN dateDifference
const validObjects = jsonData.filter(item => !isNaN(item.dateDifference));

// Sort the valid data based on the calculated date difference
validObjects.sort((a, b) => a.dateDifference - b.dateDifference);

// Get the first 5 objects (closest to the current date)
const nearestObjects = validObjects.slice(0, 5);

const ReportConfig = () => {
    const [addNewMododal, setAddNewModal] = useState(false);

    return (
        <div className={style.contain}>
            <ModalComponent mdStype="NewReport" mdStatus={addNewMododal} mdFnc={setAddNewModal} cbDataString={jsonData} />
            <div className={style.titleDiv}>
                <h3>Recent report</h3>
                <div className={style.middleDiv}></div>
                <ButtonComponent btnType="GeneralButton" btnValue="NEW REPORT" onClick={() => { setAddNewModal(true) }} />
            </div>
            <div className={style.slideDiv}>
                {nearestObjects.map(items => {
                    return (
                        <div className={style.slide} key={items.group_name}>
                            <div className={style.slideElement}>
                                <div className={style.slideTitle}>
                                    <b>{items.group_name}</b>
                                </div>
                                <p>{items.date_create}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div style={{ paddingTop: '3vh' }}>
                <TableComponent tblType="ListReportv2" tblDataString={jsonData} listInvisible={listInvisible} />
            </div>
        </div>
    )
}

export default ReportConfig;