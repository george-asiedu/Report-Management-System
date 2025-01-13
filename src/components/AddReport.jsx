import { useState } from "react"
import PropTypes from 'prop-types';

const AddReport = ({ isOpen, onClose, onSubmitSuccess }) => {
    const [formData, setFormData] = useState({
        reportTitle: '',
        message: '',
        queryType: 'Computer Science',
    });

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
    
        try {
            const response = await fetch('https://localhost:300', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
        
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
        
            const data = await response.json();
            console.log('Report submitted successfully:', data);
            alert('Report submitted successfully!');

            if (onSubmitSuccess) {
                onSubmitSuccess();
            }

            setFormData({
                reportTitle: '',
                message: '',
                queryType: 'General',
            });
    
            onClose();
        } catch (error) {
            console.error('Failed to submit the report:', error);
            alert('Failed to submit the report. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        isOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
                <div className="bg-white p-6 rounded-lg w-[400px]">
                    <h2 className="text-xl font-semibold tracking-wide mb-3">Add Report</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-[2px">
                            <label 
                                htmlFor="reportTitle" 
                                className="text-sm font-medium tracking-wide text-black">
                                Report Title
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
                        <div className="flex flex-col gap-[2px">
                            <label 
                                htmlFor="message" 
                                className="text-sm font-medium tracking-wide text-black">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="inputs"
                                rows="4"
                                required
                            />
                        </div>
            
                        <div className="flex flex-col gap-[2px">
                            <label 
                                htmlFor="queryType" 
                                className="text-sm font-medium tracking-wide text-black">
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
                                <option value="Computer Science">Computer Science</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Building">Building</option>
                                <option value="Hospitality">Hospitality</option>
                                <option value="Fashion">Fashion</option>
                            </select>
                        </div>
            
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
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    )
};

export default AddReport;

AddReport.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmitSuccess: PropTypes.func,
};