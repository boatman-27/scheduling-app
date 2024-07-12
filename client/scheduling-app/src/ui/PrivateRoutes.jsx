import { useOutletContext, Navigate } from "react-router-dom";

function PrivateRoutes({ children }) {
  const { accountStatus } = useOutletContext();
  if (!accountStatus) {
    return <Navigate to="/account/login" replace />;
  }
  return children;
}

export default PrivateRoutes;
