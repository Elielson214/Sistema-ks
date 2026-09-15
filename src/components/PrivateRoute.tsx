import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
const { isAuthenticated } = useAuth();

if (!isAuthenticated) {
return <Navigate to="/login" replace />;
}

return <>{children}</>;
}