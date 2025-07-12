import React from 'react';
import './ThankYouMessage.css';

const ThankYouMessage = ({ userInfo, onRestartChat }) => {
  return (
    <div className="thank-you-container">
      <div className="thank-you-content">
        <div className="thank-you-icon">🎉</div>
        <h2>Děkujeme za váš zájem!</h2>
        <p>
          Děkujeme, že jste se rozhodli pro IN CATERING. Náš tým vás bude kontaktovat 
          v nejbližší době s nabídkou na míru.
        </p>
        
        <div className="contact-info">
          <h3>Kontaktujte nás přímo:</h3>
          <div className="contact-item">
            <span className="contact-label">Email:</span>
            <a href="mailto:sales@incatering.cz" className="contact-link">
              sales@incatering.cz
            </a>
          </div>
          <div className="contact-item">
            <span className="contact-label">Telefon:</span>
            <a href="tel:+420123456789" className="contact-link">
              +420 123 456 789
            </a>
          </div>
        </div>

        <div className="thank-you-actions">
          <button 
            className="restart-chat-btn"
            onClick={onRestartChat}
          >
            Začít nový chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYouMessage; 