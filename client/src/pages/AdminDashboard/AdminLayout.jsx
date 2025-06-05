import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar/Sidebar"

export const AdminLayout = () => {
    return (
        <div className="h-[100vh]">
            <Sidebar>
                <Outlet />
            </Sidebar>
        </div>
    )
}