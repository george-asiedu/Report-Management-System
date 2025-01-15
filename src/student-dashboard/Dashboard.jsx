import { useState } from 'react';
import AddReport from '../components/AddReport';
import ReportTable from '../components/ReportTable';

export const Dashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refreshReports, setRefreshReports] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleReportAdded = () => {
        setRefreshReports(!refreshReports);
    };

    return (
        <div className="lg:w-[77%] px-[3%] lg:py-[3%] flex flex-col gap-4 bg-white">
            <div className="flex items-center justify-between">
                <span>
                    <h1 className="text-2xl font-bold text-black tracking-wide">Dashboard</h1>
                    <p className="mt-3 tracking-wide text-gray-600">
                        Hello👋 <strong>William!</strong> Welcome to your dashboard!.
                    </p>
                </span>
                <button 
                    onClick={toggleModal}
                    className="bg-primary text-white py-2 px-4 rounded-md cursor-pointer hover:bg-blue-600">
                    Add Report
                </button>
            </div>

            <div className="mt-5">
                <h2 className="text-xl font-semibold tracking-wide text-black">Your Reports</h2>
                <ReportTable refresh={refreshReports} />
            </div>

            <AddReport 
                isOpen={isModalOpen} 
                onClose={toggleModal} 
                onSubmitSuccess={handleReportAdded} 
            />
        </div>
    );
};
