import { useState, useEffect } from 'react';

export const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Vérifier le token au chargement
        const checkToken = () => {
            const token = localStorage.getItem('token');
            setIsLoggedIn(!!token);
        };

        checkToken();

        // Écouter les changements de token
        const tokenChangeHandler = () => {
            checkToken();
        };

        // Ajouter l'écouteur d'événement
        window.addEventListener('storage', tokenChangeHandler);

        // Nettoyer l'écouteur lors du démontage
        return () => {
            window.removeEventListener('storage', tokenChangeHandler);
        };
    }, []);

    return {
        isLoggedIn,
        checkToken: () => {
            const token = localStorage.getItem('token');
            return !!token;
        }
    };
};
