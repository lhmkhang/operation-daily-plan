'use client'
import { ReportDetailProvider } from '@/components/helpers/ReportDetailContext'
import ReportDetailComponent from '../_reportdetail/ReportDetail'
// import { useParams } from 'next/navigation';

const ReportDetailPage = (params) => {
    return (
        <ReportDetailProvider>
            <ReportDetailComponent report_id={params.params.report_id} />
        </ReportDetailProvider>
    )
}

export default ReportDetailPage