import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // If not logged in, redirect to login
  if (!token) return <Navigate to="/login" replace />;

  // If adminOnly route and user is not admin
  if (adminOnly && role !== "admin") return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
