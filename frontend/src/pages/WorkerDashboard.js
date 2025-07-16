// frontend/src/pages/WorkerDashboard.js
import React from 'react';
import LogoutButton from '../components/LogoutButton';
import TokenCheck from '../components/TokenCheck';

const WorkerDashboard = () => {
    return (
        <div className="dashboard">
            <TokenCheck />
            <h2>Tableau de bord Travailleur</h2>
            <LogoutButton />
            <div className="dashboard-content">
                {/* Ajoutez ici le contenu spécifique pour les travailleurs */}
                <div className="dashboard-section">
                    <h3>Mes Tâches</h3>
                    <ul>
                        <li>Tâche 1</li>
                        <li>Tâche 2</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default WorkerDashboard;