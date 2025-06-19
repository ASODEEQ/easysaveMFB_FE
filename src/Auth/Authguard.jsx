//AuthGuard.js
import { Navigate, Outlet } from 'react-router-dom';

const AuthGuard = ({ isAuthenticated, redirectPath = '/login', children }) => {
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet/>;
};

export default AuthGuard;