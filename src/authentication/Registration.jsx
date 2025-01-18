import { useState } from 'react';
import ttuLogo from '../assets/ttu_logo.jpg';
import { Link } from 'react-router-dom';
import { addDocument } from '../firebase/firestore';

export const Registration = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        department: '',
        photo: null,
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // const handleFileChange = (e) => {
    //     const file = e.target.files[0];
    //     setFormData((prevData) => ({ ...prevData, photo: file }));
    // };

    const validateForm = () => {
        const newErrors = {};
    
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) newErrors.email = 'Invalid email format';
    
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
        if (!formData.phone) newErrors.phone = 'Phone is required'; 
        if (!formData.department) newErrors.department = 'Department is required';
        if (!formData.photo) newErrors.photo = 'Photo is required';
    
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        setLoading(true);
        setSuccessMessage('');

        try {

            addDocument({
                path:'/users', 
                id: new Date().getTime().toLocaleString(),
                data: {role:"student", ...formData}
            })

                setSuccessMessage('Registration successful!');

        } catch (error) {
            setErrors({ apiError: 'Unable to connect to the server. Please try again later.', error });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-screen overflow-hidden flex items-center lg:gap-10 bg-white">
            <div className="hidden lg:block lg:max-w-full w-[50%] lg:h-screen">
                <img className="w-full h-full object-cover" src={ttuLogo} alt="ttu logo" />
            </div>
            <div className="w-full lg:w-[50%]">
                <form onSubmit={handleSubmit} className="w-full px-[5%] lg:px-0 lg:w-[400px] m-auto flex flex-col gap-3">
                    <h2 className="text-xl font-bold tracking-wide">Register your Account</h2>

                    {successMessage && <p className="text-green-600 text-xs tracking-wide">{successMessage}</p>}
                    {Object.keys(errors).map((key) => (
                        <p key={key} className="text-red-600 text-xs tracking-wide">{errors[key]}</p>
                    ))}

                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-[2px]">
                            <label className="tracking-wide text-sm font-medium">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="inputs"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-[2px]">
                            <label className="tracking-wide text-sm font-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="inputs"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-[2px]">
                            <label className="tracking-wide text-sm font-medium">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="inputs"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-[2px]">
                            <label className="tracking-wide text-sm font-medium">Department</label>
                            <input
                                type="text"
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                className="inputs"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-[2px]">
                            <label className="tracking-wide text-sm font-medium">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="inputs"
                                required
                            />
                        </div>
                        {/* <div className="flex flex-col gap-2">
                            <label className="tracking-wide text-sm font-medium">Photo</label>
                            <input
                                type="file"
                                name="photo"
                                onChange={handleFileChange}
                                className="inputs"
                                required
                            />
                        </div> */}
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-[6px] bg-primary hover:bg-blue-600 text-white rounded-md cursor-pointer mt-3 ${
                            loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                    <p className="text-sm tracking-wide -mt-2">
                        Already have an account?
                        <Link 
                            to='/' 
                            className="text-primary font-medium tracking-wide ml-1">
                            Login
                        </Link>
                    </p>
                    <p className="text-xs tracking-wide text-center mt-3">&copy; 2025 Takoradi Technical University</p>
                </form>
            </div>
        </div>
    );
};