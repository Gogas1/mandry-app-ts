import { useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import AuthContext from "./AuthenticationContext";

interface ProtectedRouteProps {
    redirectPath?: string;
    element: JSX.Element;
}

export default function ProtectedRoute({ element, redirectPath = '/' }: ProtectedRouteProps) {
    const authContext = useContext(AuthContext);

    if(!authContext) {
        throw new Error('ProtectedRoute must be used within an AuthProvider');
    }

    const { authState } = authContext;

    if(!authState.isAuthenticated) {
        return <Navigate to={redirectPath} replace />
    }

    return element;
}