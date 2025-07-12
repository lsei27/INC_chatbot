import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import './ChatInput.css';

const ChatInput = ({ onSendMessage, isLoading, isConnected }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading && isConnected) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [message]);

  return (
    <div className="chat-input-container">
      <form onSubmit={handleSubmit} className="chat-input-form">
        <div className="input-wrapper">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isConnected ? "Napište zprávu..." : "Připojování..."}
            disabled={isLoading || !isConnected}
            className="chat-input"
            rows="1"
            maxLength="1000"
          />
          
          <button
            type="submit"
            disabled={!message.trim() || isLoading || !isConnected}
            className="send-button"
            title="Odeslat zprávu"
          >
            <Send size={20} />
          </button>
        </div>
        
        {!isConnected && (
          <div className="connection-status">
            <span className="status-dot connecting"></span>
            Připojování k serveru...
          </div>
        )}
        
        {isLoading && (
          <div className="connection-status">
            <span className="status-dot loading"></span>
            Odesílání zprávy...
          </div>
        )}
      </form>
    </div>
  );
};

export default ChatInput; 