import React from 'react';
import { useNavigate } from 'react-router-dom';
import TokenCheck from '../components/TokenCheck';

const ClientDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('token_type');
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <TokenCheck />
      <h1>Tableau de bord Client</h1>
      <div className="dashboard-content">
        <div className="dashboard-section">
          <h2>Mes Services</h2>
          {/* Liste des services disponibles */}
          <ul>
            <li>Service 1</li>
            <li>Service 2</li>
            <li>Service 3</li>
          </ul>
        </div>
        <div className="dashboard-section">
          <h2>Mes Commandes</h2>
          {/* Liste des commandes passées */}
          <ul>
            <li>Commande 1</li>
            <li>Commande 2</li>
          </ul>
        </div>
      </div>
      <button onClick={handleLogout} className="logout-btn">Déconnexion</button>
    </div>
  );
};

export default ClientDashboard;
