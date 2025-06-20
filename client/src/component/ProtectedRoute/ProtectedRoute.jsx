import { Navigate, Outlet } from "react-router-dom";
import store from "../../redux/store";

export const ProtectedRoute = ({ allowedRoles = [] }) => {
    const { user, token } = store.getState().auth;
    
    if (!user || !token) {
        return <Outlet />;
    }

    if (!allowedRoles.includes(user.role)) {
        if (user.role === "HR") return <Navigate to="/recruiter/dashboard" replace />;
        return <Navigate to="/home" replace />;
    }
    return <Outlet />
};