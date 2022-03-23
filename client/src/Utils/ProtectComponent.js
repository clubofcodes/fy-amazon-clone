import { Navigate } from 'react-router-dom';
import { useAuthentication } from './Context/useAuthentication';

// useAuthentication is To verify if user is loged in and has value in state of global context.
// To redirect to login page if user is accessing children component without login.
export const ProtectComponent = ({ children }) => (useAuthentication().userData?.email) ? <Navigate to='/' replace /> : children;