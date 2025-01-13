import PropTypes from 'prop-types';
import Dashboard from '../assets/dashboard.svg';
import Logout from '../assets/logout.svg';
import { Link } from 'react-router-dom';

export const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
    return (
        <>
            <div
                className={`${
                    isSidebarOpen ? "lg:w-[23%]" : "lg:w-[13%]"
                } bg-primary text-white transition-all duration-300 px-2 h-screen relative z-10`}
                >
                <div className="flex items-center justify-between px-4 py-6">
                    <h1
                    className={`text-lg font-bold transition-all duration-300 ${
                        isSidebarOpen ? "opacity-100" : "opacity-0"
                    }`}>
                        Dashboard
                    </h1>
                    <button
                        onClick={toggleSidebar}
                        className="text-white focus:outline-none">
                        {isSidebarOpen ? "<<" : ">>"}
                    </button>
                </div>
                <nav className="mt-6 flex flex-col">
                    <ul className="space-y-2">
                        <li className='flex w-[95%] mx-auto items-center px-2 transition-all duration-300 py-1 gap-4 hover:bg-blue-600 hover:rounded-md'>
                            <img src={Dashboard} alt="dashboard icon" />
                            <Link
                                to='/dashboard'
                                className="text-white text-[15px] leading-[1.7rem] tracking-wide">
                                Home
                            </Link>
                        </li>
                        <li className='flex w-[88%] items-center px-2 transition-all duration-300 py-1 gap-4 hover:bg-blue-600 hover:rounded-md absolute left-5 bottom-7'>
                        <img src={Logout} alt="logout icon" className='w-[22px]' />
                            <Link
                                to='/login'
                                className="text-white text-[15px] leading-[1.7rem] tracking-wide">
                                Logout
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>      
        </>
    )
}

Sidebar.propTypes = {
    isSidebarOpen: PropTypes.bool.isRequired,
    toggleSidebar: PropTypes.func.isRequired,
};