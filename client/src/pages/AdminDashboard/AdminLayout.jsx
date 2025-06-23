import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar/Sidebar"
import { useGetRecruiterDetails } from '../../hooks/admin/useGetRecruiterDetails';

export const AdminLayout = () => {
    const { recruiterDetails } = useGetRecruiterDetails();
    return (
        <div className="h-[100vh]">
            <Sidebar userDetails={recruiterDetails}>
                <Outlet />
            </Sidebar>
        </div>
    )
}