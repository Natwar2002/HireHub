import AdminDashboard from "./AdminDashboard/AdminDashboard"
import Sidebar from "./Sidebar/Sidebar"

export const AdminLayout = () => {
    return (
        <div className="h-[100vh]">
            <Sidebar>
                <AdminDashboard />
            </Sidebar>
        </div>
    )
}