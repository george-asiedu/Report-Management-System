import { useState } from "react"
import { Dashboard } from "./Dashboard"
import { Sidebar } from "./Sidebar"
import { Navigate } from "react-router-dom";

export const HomeContent = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const user = JSON.parse(localStorage.getItem("USER"))

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    if(user == null){
        return <Navigate to="/login" replace />
    }

    

    return (
        <div className="flex h-screen w-full bg-white">
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <Dashboard />
        </div>
    )
}