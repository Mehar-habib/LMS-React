import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// Protected route for authenticated users
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((store) => store.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

// Route to restrict authenticated users from accessing certain pages (like login/signup)
export const AuthenticatedUser = ({ children }) => {
  const { isAuthenticated } = useSelector((store) => store.auth);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

// Route for admin/instructor access
export const AdminRoute = ({ children }) => {
  const { user, isAuthenticated } = useSelector((store) => store.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  if (user?.role !== "instructor") {
    return <Navigate to="/" />;
  }

  return children;
};
