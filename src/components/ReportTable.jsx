import { useState, useEffect } from "react";
import { searchQuery } from "../firebase/firestore";

const ReportTable = () => {
  const [reports, setReports] = useState([]);
  const [report, setReport] = useState({})
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
  }, [user,]);


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
              Category
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
              onClick={() => setReport(report)}
              className="text-sm text-secondary cursor-pointer tracking-wide"
            >
              <td className="p-3 text-sm hidden md:table-cell tracking-wide">{index + 1}</td>
              <td className="p-3 text-sm tracking-wide truncate">
                {report.reportTitle}
              </td>
              <td className="p-3 text-sm hidden md:table-cell tracking-wide truncate">{report.message}</td>
              <td className="p-3 text-sm tracking-wide">{report.queryType}</td>
              <td className="p-3 text-sm tracking-wide">{report.status}</td>
              <td className="p-3 text-sm  hidden md:table-cell tracking-wide">{report?.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
     {report?.media?.length > 0 && <div className=" fixed flex-wrap left-0 flex gap-3 bottom-0 h-56 p-10 bg-black w-full">
        {report?.media.map(md =>  <img key={md} className="w-full md:w-1/4 shrink-0 h-full object-cover" src={md} alt="report media" />
        )}
      
      </div>}
    </div>
  );
};

export default ReportTable;


