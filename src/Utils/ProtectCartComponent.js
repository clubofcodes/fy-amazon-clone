import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthentication } from './Context/useAuthentication';

export const ProtectCartComponent = ({ children }) => {
  // To get current path to set in state of Login form.
  const location = useLocation();
  // To verify if user is loged in and has value in state of global context.
  const userAuth = useAuthentication();

  const userData = useSelector((state) => state.userData);
  const { loading, error, user } = userData;

  // console.log(userAuth.userData?.email);

  // To redirect to login page if user is accessing children component without login.
  return (!user?.email) ? <Navigate to='/signin' state={{ path: location.pathname }} /> : children;
}
