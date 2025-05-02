import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isSignedin } = useAuth();
  const location = useLocation(); 

  if (!isSignedin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
