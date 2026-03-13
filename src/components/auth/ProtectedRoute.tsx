import { useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";

interface ProtectedRouteProps {
  children?: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [modalDismissed, setModalDismissed] = useState(false);

  if (!isAuthenticated) {
    if (modalDismissed) {
      navigate("/", { replace: true });
      return null;
    }
    return (
      <AuthModal
        open={true}
        onOpenChange={(open) => {
          if (!open) setModalDismissed(true);
        }}
      />
    );
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Optionally redirect to a generic dashboard or not-authorized page
    return <Navigate to="/" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
