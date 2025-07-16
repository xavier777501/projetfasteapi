import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TokenCheck = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login', { replace: true });
            }
        };

        // Vérifier le token au chargement
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
    }, [navigate]);

    return null;
};

export default TokenCheck;
