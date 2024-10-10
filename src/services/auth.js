import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Element }) => {
    const isAuthenticated = () => {
        return localStorage.getItem('token') !== null;  //todo: Grab the login tkenid from BE
    };

    return isAuthenticated() ? <Element /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
