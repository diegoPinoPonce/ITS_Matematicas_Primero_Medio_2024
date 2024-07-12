import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
    const auth = useAuth();
    const { logout } = useAuth();

    if (!auth.isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (!allowedRoles.includes(auth.role)) {
        return logout(), <Navigate to="/" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;