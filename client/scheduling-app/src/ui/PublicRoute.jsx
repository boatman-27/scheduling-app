import { useOutletContext, Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { accountStatus } = useOutletContext();

  if (accountStatus) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
