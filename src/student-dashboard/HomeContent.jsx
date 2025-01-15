import { useState } from "react"
import { Dashboard } from "./Dashboard"
import { Sidebar } from "./Sidebar"

export const HomeContent = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen w-full bg-white">
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <Dashboard />
        </div>
    )
}