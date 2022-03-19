import { Navigate, useLocation } from 'react-router-dom';
import { useAuthentication } from './Context/useAuthentication';

export const ProtectComponent = ({ children }) => {
  // To get current path to set in state of Login form.
  const location = useLocation();
  // To verify if user is loged in and has value in state of global context.
  const userAuth = useAuthentication();

  // To redirect to login page if user is accessing children component without login.
  return (userAuth.userData?.email) ? <Navigate to='/' state={{ path: location.pathname}} /> : children;
}
