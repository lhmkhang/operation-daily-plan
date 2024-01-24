'use client'
import { ReportProvider } from '@/components/helpers/ReportContext'
import ReportDetailComponent from '@/components/base/reportdetail/ReportDetail'
// import { useParams } from 'next/navigation';

const ReportDetailPage = (params) => {

    return (
        <ReportProvider>
            <ReportDetailComponent report_id={params.params.report_id} />
        </ReportProvider>
    )
}

export default ReportDetailPage