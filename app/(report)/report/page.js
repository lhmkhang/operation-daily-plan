'use client'
import React, { useEffect, Suspense } from 'react'
import { Box, Grid } from '@mui/material';
import LoadingComponent from '@/components/base/Loading'
import CardItemComponent from '@/components/base/CardItem'

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
    }
]

const Report = () => {
    

    const listgroup = [...new Set(jsonData.filter(value => value.group_name != ''))]

    return (
        <Box sx={{ flexGrow: 1, p: 2 }}>
            <Suspense fallback={<LoadingComponent />}>
                <Grid container>
                    {listgroup.map((row, index) => {
                        return (
                            <Grid item xs={12} md={6} xl={3} key={row._id}>
                                <CardItemComponent data={row} />
                            </Grid>
                        )
                    })}
                </Grid>
            </Suspense>
        </Box>
    )
}

export default Report;
