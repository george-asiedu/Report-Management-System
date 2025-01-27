import { useState } from "react";
import AddReport from "../components/AddReport";
import ReportTable from "../components/ReportTable";
import { Link } from "react-router-dom";
import logout from "../assets/logout.svg";
import dashboard from "../assets/dashboard.svg";

export const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshReports, setRefreshReports] = useState(false);
  const user = JSON.parse(localStorage.getItem("USER"));

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleReportAdded = () => {
    setRefreshReports(!refreshReports);
  };

  return (
    <div className="md:w-[77%] w-screen  md:py-[3%] flex flex-col gap-4 bg-white">
      <div className="flex justify-between p-2   bg-blue-900 w-full items-center md:hidden">
        <div className="flex flex-col text-white">
          <h1 className="font-bold text-lg">Incident Report Portal</h1>
          <p className="text-sm">Track your reports from here...</p>
        </div>

        <button
          onClick={toggleModal}
          className="bg-green-500 shrink-0 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-blue-600"
        >
          Add Report
        </button>
      </div>
      <div className="md:flex  px-3 hidden items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-black tracking-wide">
            Dashboard
          </h1>
          <p className="mt-3 tracking-wide text-sm md:text-lg text-gray-600">
            Hello👋 <strong>{user?.name}</strong> Welcome to your dashboard
          </p>
        </div>
        <button
          onClick={toggleModal}
          className="bg-primary shrink-0 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-blue-600"
        >
          Add Report
        </button>
      </div>

      <div className="mt-3 p-3">
        <h2 className="text-xl py-2 font-semibold tracking-wide text-black">
          Recent Reports
        </h2>
        <ReportTable refresh={refreshReports} />
      </div>

      <AddReport
        isOpen={isModalOpen}
        onClose={toggleModal}
        onSubmitSuccess={handleReportAdded}
      />
      <div className="flex fixed bottom-3 w-full p-4 md:hidden gap-2 justify-center">
        <Link
          to="/login"
          className="flex items-center gap-2 w-fit p-2 rounded-sm bg-primary text-white"
        >
          <img
            src={dashboard}
            alt="logout icon"
            className="w-5 object-contain"
          />
          Dashboard
        </Link>
        <Link
          to="/login"
          className="flex items-center gap-2  rounded-sm w-fit p-2  justify-center bg-red-600 text-white"
        >
          <img src={logout} alt="logout icon" className="w-5 object-contain" />
          Logout
        </Link>
      </div>
    </div>
  );
};
