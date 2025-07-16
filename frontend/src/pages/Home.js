import React from 'react';
import AuthForm from '../components/AuthForm';
import '../components/AuthForm.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Bienvenue</h1>
      <p>Créez votre compte pour commencer</p>
      <AuthForm />
    </div>
  );
};

export default Home;
