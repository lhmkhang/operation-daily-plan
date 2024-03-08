
import React, { useEffect, Suspense, useState, useContext } from 'react';
import { ReportNarbarContext } from '@/components/helpers/ReportNarbarContext';
import NarbarComponent from './Narbar'
import LoadingComponent from '@/components/base/Loading'

const data_narbar_demo = [
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
    }
]

const data_report_deme = {
    "_id": "01",
    "report_name": "Maximize Efficiency Report",
    "user_create": "loilm",
    "date_create": "01.12.2023",
    "description": "Maximize Efficiency Report For Q3, Q4 2023",
    "charts": [
        {
            "_id": "01",
            "chart_name": "Incident Chart",
            "chart_type": "Column Chart",
            "data_source_id": "01",
        },
        {
            "_id": "02",
            "chart_name": "Tasks Chart",
            "chart_type": "Column Chart",
            "data_source_id": "01",
        }
    ]
}

const ReportDetailComponent = (props) => {
    const { report_id } = props;
    let { reportsNarbar, setReportsNarbar } = useContext(ReportNarbarContext);

    useEffect(() => {
        setReportsNarbar(data_narbar_demo)
    }, [setReportsNarbar])

    const loadReportDetail = () => {

    }

    return (
        <div>
            <NarbarComponent />
            <p>loilm</p>
        </div >
    )

}

export default ReportDetailComponent;