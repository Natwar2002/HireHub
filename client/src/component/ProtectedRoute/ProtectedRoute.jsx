// import { LucideLoader2 } from 'lucide-react';
// import { Navigate } from 'react-router-dom';
// import store from '../../redux/store';

export const ProtectedRoute = ({ children }) => {
    // const { user, token, isLoading } = store.getState().auth;

    // if(!user || !token) {
    //     return <Navigate to='' />;
    // }

    // if(isLoading) {
    //     return <div><LucideLoader2 className='animate-spin ml-2' /></div>;
    // }

    return children;
};