import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-icon">🤖</span>
          <span className="logo-text">AI Chatbot</span>
        </div>
        <div className="header-subtitle">
          Komunikujte s vaším OpenAI asistentem
        </div>
      </div>
    </header>
  );
};

export default Header; 