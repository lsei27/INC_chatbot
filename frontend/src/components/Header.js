import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-icon">🤖</span>
          <span className="logo-text">IN CATERING chatbot</span>
        </div>
        <div className="header-subtitle">
          Komunikujete s naším AI asistentem
        </div>
      </div>
    </header>
  );
};

export default Header; 
