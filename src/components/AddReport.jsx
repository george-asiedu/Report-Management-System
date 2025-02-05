import { useState } from "react";
import PropTypes from "prop-types";
import { addDocument, uploadFile } from "../firebase/firestore";

const QUERY_TYPES = [
  "TTU Portal",
  "Hostel Issues",
  "Robbery",
  "Harrassment",
  "Suggestions",
  "Lecturer Issues",
  "Others",
];
const AddReport = ({ isOpen, onClose }) => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    reportTitle: "",
    message: "",
    queryType: "N/A",
    status: "open",
    date: new Date().toLocaleString(),
  });

  const user = JSON.parse(localStorage.getItem("USER"));

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);


    addDocument({
      path: "/queries",
      id: new Date().getTime().toString(),
      data: { ...formData, media, ...user },
    })
      .then(() => {
        onClose();
        setIsSubmitting(false);
        setFormData({
          reportTitle: "",
          message: "",
          queryType: "General",
        });
      })
      .catch((err) => {
        setIsSubmitting(false);

        console.error("Failed to submit the report:", err.message);
        alert("Failed to submit the report. Please try again.");
      });

     
  };

  const uploadFiles =  async (e) => {
    setLoading(true);
    if (e.target.files.length > 0) {
      let files = Array.from(e.target.files);
      let path = "irs-images/";
      await uploadFile({
        path,
        files,
        getLink: setMedia,
      });
      setLoading(false);
      
    }

  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg w-[400px]">
          <h2 className="text-xl font-semibold tracking-wide mb-3">
            Add Report
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="queryType"
                className="text-sm font-medium tracking-wide text-black"
              >
                Query Type
              </label>
              <select
                id="queryType"
                name="queryType"
                value={formData.queryType}
                onChange={handleChange}
                className="inputs"
                required
              >
                <option value="">Select Query Type</option>
                {QUERY_TYPES.map((qT) => (
                  <option value={qT} key={qT}>
                    {qT}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="reportTitle"
                className="text-sm font-medium tracking-wide text-black"
              >
                Summary of Message
              </label>
              <input
                id="reportTitle"
                name="reportTitle"
                type="text"
                value={formData.reportTitle}
                onChange={handleChange}
                className="inputs"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="message"
                className="text-sm font-medium tracking-wide text-black"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="inputs resize-none border bg-gray-100"
                rows="4"
                required
              />
            </div>
            <label
              htmlFor="media"
              className="p-2 cursor-pointer border border-dashed text-gray-400 text-center border-black text-sm"
            >
              {loading ? "Uploading images... " : "Attach media (optional)"}
            </label>
            <input
              onChange={uploadFiles}
              type="file"
              name="media"
              id="media"
              multiple
              accept="image/*, application/pdf"
              className="hidden"
            />

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 text-sm hover:bg-gray-400 text-black py-2 px-4 rounded-md"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-sm hover:bg-blue-700 text-white py-2 px-4 rounded-md"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default AddReport;

AddReport.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmitSuccess: PropTypes.func,
};
