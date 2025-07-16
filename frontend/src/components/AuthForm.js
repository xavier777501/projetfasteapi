import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ isLogin, onToggleMode }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isWorker, setIsWorker] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Réinitialiser l'erreur avant l'envoi

        if (!email || !password || (!isLogin && !username)) {
            setError('Veuillez remplir tous les champs');
            return;
        }

        if (isLoading) {
            return; // Empêcher les doubles soumissions
        }

        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:8000/${isLogin ? 'token' : 'auth/register'}`, {
                method: 'POST',
                headers: {
                    'Content-Type': isLogin ? 'application/x-www-form-urlencoded' : 'application/json',
                },
                body: isLogin 
                    ? new URLSearchParams({
                        username: email.trim(),
                        password: password
                    }).toString()
                    : JSON.stringify({
                        email: email.trim(),
                        username: username.trim(),
                        password: password,
                        is_worker: isWorker
                    }),
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data.detail || 'Une erreur est survenue');
                return;
            }

            const data = await response.json();

            if (!isLogin) {
                // Pour l'inscription, on redirige toujours vers la page de connexion
                navigate('/login', { replace: true });
            } else {
                // Pour la connexion réussie
                if (data.access_token) {
                    localStorage.setItem('token', data.access_token);
                    navigate(data.is_worker ? '/worker-dashboard' : '/client-dashboard', { replace: true });
                } else {
                    setError('Token non reçu du serveur');
                }
            }
        } catch (error) {
            setError('Une erreur est survenue lors de la communication avec le serveur');
            console.error('Erreur:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleMode = () => {
        setError(null);
        onToggleMode();
    };

    return (
        <div className="auth-form">
            <h2>{isLogin ? 'Connexion' : 'Inscription'}</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit} className={isLoading ? 'loading' : ''}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                {!isLogin && (
                    <>
                        <div className="form-group">
                            <label htmlFor="username">Nom d'utilisateur:</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Vous êtes :</label>
                            <div className="role-selector">
                                <label>
                                    <input
                                        type="radio"
                                        name="role"
                                        checked={!isWorker}
                                        onChange={() => setIsWorker(false)}
                                    />
                                    Client
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="role"
                                        checked={isWorker}
                                        onChange={() => setIsWorker(true)}
                                    />
                                    Travailleur
                                </label>
                            </div>
                        </div>
                    </>
                )}
                <div className="form-group">
                    <label htmlFor="password">Mot de passe:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-button" disabled={isLoading}>
                    {isLoading ? 'Chargement...' : isLogin ? 'Se connecter' : 'Envoyer'}
                </button>
            </form>
            <button onClick={handleToggleMode} className="toggle-button">
                {isLogin ? 'Créer un compte' : 'Se connecter'}
            </button>
        </div>
    );
};

export default AuthForm;
