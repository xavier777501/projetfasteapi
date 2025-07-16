import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleMode = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="auth-page">
            <AuthForm isLogin={isLogin} onToggleMode={toggleMode} />
        </div>
    );
};

export default AuthPage;
