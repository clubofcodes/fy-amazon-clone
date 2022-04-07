import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

// userData reducer is To verify if user is loged in and has value in state of global redux.
// To redirect to login page if user is accessing children component without login.
export const ProtectComponent = ({ children }) => {

    const userData = useSelector((state) => state.userData);

    const isAdmin = userData?.user?.userRole.toLowerCase().includes("admin");

    if (isAdmin) {
        return <Navigate to='/admin' replace />
    } else {
        return (userData?.user?.email) ? <Navigate to='/' replace /> : children;
    }

} 