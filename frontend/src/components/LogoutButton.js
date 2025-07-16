import React from 'react';

const LogoutButton = () => {
    const handleLogout = () => {
        // Supprimer le token
        localStorage.removeItem('token');
        
        // Forcer un rechargement complet de la page
        window.location.reload(true);
    };

    return (
        <button onClick={handleLogout} className="logout-button">
            Déconnexion
        </button>
    );
};

export default LogoutButton;
