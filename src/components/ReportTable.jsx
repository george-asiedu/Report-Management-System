import { useState, useEffect} from 'react'
import PropTypes from 'prop-types';

const ReportTable = ({ refresh }) => {
    const [reports, setReports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('https://localhost:300/reports');
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();
                setReports(data);
            } catch (error) {
                console.error('Failed to fetch reports:', error);
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchReports();
    }, [refresh]);
    
    if (isLoading) {
        return <p className='text-sm tracking-wide text-red-primary'>Loading reports...</p>;
    }
    
    if (reports.length === 0) {
        return <p className='text-sm tracking-wide text-red-400'>No reports available.</p>;
    }

    return (
        <div className="overflow-y-auto lg:max-h-[400px]">
            <table className="w-full">
                <thead className='bg-[#e8eef8] sticky top-0 z-[1]'>
                    <tr>
                        <th className="text-black tracking-wide font-medium py-5 px-5 text-sm text-left">#</th>
                        <th className="text-black tracking-wide font-medium py-5 px-5 text-sm text-left">Report Title</th>
                        <th className="text-black tracking-wide font-medium py-5 px-5 text-sm text-left">Message</th>
                        <th className="text-black tracking-wide font-medium py-5 px-5 text-sm text-left">Query Type</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report, index) => (
                        <tr key={report.id} className="text-sm text-secondary tracking-wide">
                            <td className="px-5 text-sm tracking-wide">{index + 1}</td>
                            <td className="px-5 text-sm tracking-wide">{report.reportTitle}</td>
                            <td className="px-5 text-sm tracking-wide">{report.message}</td>
                            <td className="px-5 text-sm tracking-wide">{report.queryType}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ReportTable;

ReportTable.propTypes = {
    refresh: PropTypes.bool.isRequired
};