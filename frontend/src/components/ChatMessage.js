import React from 'react';
import './ChatMessage.css';
import ReactMarkdown from 'react-markdown';

const ChatMessage = ({ message }) => {
  const { role, content, timestamp } = message;
  
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('cs-CZ', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMessageIcon = (role) => {
    switch (role) {
      case 'user':
        return '👤';
      case 'assistant':
        return '🤖';
      case 'error':
        return '⚠️';
      default:
        return '💬';
    }
  };

  const getMessageClass = (role) => {
    switch (role) {
      case 'user':
        return 'message-user';
      case 'assistant':
        return 'message-assistant';
      case 'error':
        return 'message-error';
      default:
        return 'message-default';
    }
  };

  return (
    <div className={`chat-message ${getMessageClass(role)}`}>
      <div className="message-avatar">
        <span className="message-icon">{getMessageIcon(role)}</span>
      </div>
      
      <div className="message-content">
        <div className="message-text">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
        
        <div className="message-time">
          {formatTime(timestamp)}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage; 
