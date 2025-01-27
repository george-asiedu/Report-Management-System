import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { searchQuery } from "../firebase/firestore";

const ReportTable = ({ refresh }) => {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("USER"));

  useEffect(() => {
    searchQuery({
      path: "/queries",
      type: "email",
      searchString: user?.email,
      getData: setReports,
    });
    setIsLoading(false)
  }, [user, refresh]);


  if (isLoading) {
    return (
      <p className="text-sm tracking-wide text-red-primary">
        Loading reports...
      </p>
    );
  }

  if (reports.length === 0) {
    return (
      <p className="text-sm tracking-wide text-red-400">
        No reports available. {user?.name}
      </p>
    );
  }

  return (
    <div className="overflow-y-auto lg:max-h-[400px]">
      <table className="w-full">
        <thead className="bg-[#e8eef8] sticky top-0 z-[1]">
          <tr>
            <th className="text-black hidden md:table-cell tracking-wide font-medium py-5 px-5 text-sm text-left">
              #
            </th>
            <th className="text-black tracking-wide font-medium py-5 px-5 text-sm text-left">
              Summary
            </th>
            <th className="text-black hidden md:table-cell tracking-wide font-medium py-5 px-5 text-sm text-left">
              Message
            </th>
            <th className="text-black tracking-wide font-medium py-5 px-5 text-sm text-left">
              Query Type
            </th>
            <th className="text-black tracking-wide font-medium py-5 px-5 text-sm text-left">
              Status
            </th>
            <th className="text-black hidden md:table-cell tracking-wide font-medium py-5 px-5 text-sm text-left">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr
              key={index + 1}
              className="text-sm text-secondary tracking-wide"
            >
              <td className="p-3 text-sm hidden md:table-cell tracking-wide">{index + 1}</td>
              <td className="p-3 text-sm tracking-wide">
                {report.reportTitle}
              </td>
              <td className="p-3 text-sm hidden md:table-cell tracking-wide">{report.message}</td>
              <td className="p-3 text-sm tracking-wide">{report.queryType}</td>
              <td className="p-3 text-sm tracking-wide">{report.status}</td>
              <td className="p-3 text-sm  hidden md:table-cell tracking-wide">{report?.date}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;

ReportTable.propTypes = {
  refresh: PropTypes.bool.isRequired,
};
