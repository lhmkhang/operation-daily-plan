'use client'
import React from 'react'

const ReportDetailPage = (params) => {
    // console.log(params);
    console.log(JSON.stringify(params.params.reportid));
    
    return (
        <div>
            <div>ReportDetailPage</div>
            <h1>{params.params.reportid}</h1>
        </div >
    )

}

export default ReportDetailPage