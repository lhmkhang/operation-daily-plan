'use client'
import { ReportNarbarProvider } from '@/components/helpers/ReportNarbarContext'
import ReportDetailComponent from '../_reportdetail/ReportDetail'
// import { useParams } from 'next/navigation';

const ReportDetailPage = (params) => {
    return (
        <ReportNarbarProvider>
            <ReportDetailComponent report_id={params.params.report_id} />
        </ReportNarbarProvider>
    )
}

export default ReportDetailPage