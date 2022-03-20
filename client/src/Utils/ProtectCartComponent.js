import { Navigate, useLocation } from 'react-router-dom';
import { useAuthentication } from './Context/useAuthentication';

export const ProtectCartComponent = ({ children }) => {
  // To get current path to set in state of Login form.
  const location = useLocation();
  // To verify if user is loged in and has value in state of global context.
  const userAuth = useAuthentication();

  console.log(userAuth.userData?.email);

  // To redirect to login page if user is accessing children component without login.
  return (!userAuth.userData?.email) ? <Navigate to='/signin' state={{ path: location.pathname}} /> : children;
}
