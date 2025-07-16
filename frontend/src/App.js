
import React from 'react';


import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';


import AuthPage from './pages/AuthPage';

import WorkerDashboard from './pages/WorkerDashboard';
import ClientDashboard from './pages/ClientDashboard';



function App() {
    const isAuthenticated = localStorage.getItem('token');

    const PrivateRoute = ({ children }) => {
        return isAuthenticated ? children : <Navigate to="/login" />;
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/register" element={<AuthPage />} />
                <Route 
                    path="/worker-dashboard" 
                    element={
                        <PrivateRoute>
                            <WorkerDashboard />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/client-dashboard" 
                    element={
                        <PrivateRoute>
                            <ClientDashboard />
                        </PrivateRoute>
                    } 
                />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;