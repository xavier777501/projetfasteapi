// frontend/src/components/LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Veuillez remplir tous les champs');
            return;
        }


        const response = await fetch('http://localhost:8000/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },


            body: new URLSearchParams({
                username: email.trim(),
                password: password
            }).toString(),
        });

        if (!response.ok) {


            const errorData = await response.json();
            // Extract error message from Pydantic validation error
            const errorMessage = errorData.detail ? errorData.detail[0].msg : 'Une erreur est survenue';
            setError(errorMessage);
        } else {
            const data = await response.json();

            localStorage.setItem('token', data.access_token);
            if (data.is_worker) {

                navigate('/worker-dashboard');
            } else {

                navigate('/client-dashboard');
            }
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Log In</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p>
                Don't have an account? <a href="/register">Sign up here</a>
            </p>
        </div>
    );
};

export default LoginForm;