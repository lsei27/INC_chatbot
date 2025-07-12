import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import ChatService from '../services/ChatService';
import UserInfoForm from './UserInfoForm';
import './ChatInterface.css';

const ChatInterface = ({ isConnected, setIsConnected }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [threadId, setThreadId] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Nově: vytvoření threadu až po vyplnění userInfo
  useEffect(() => {
    if (!userInfo) return;
    const initializeChat = async () => {
      try {
        const response = await ChatService.createThread(userInfo);
        setThreadId(response.data.threadId);
        setIsConnected(true);
      } catch (error) {
        console.error('Chyba při inicializaci chatu:', error);
        setIsConnected(false);
      }
    };
    initializeChat();
  }, [userInfo, setIsConnected]);

  const handleSendMessage = async (message) => {
    if (!message.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await ChatService.sendMessage(message, threadId);
      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response.data.assistantMessage,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chyba při odesílání zprávy:', error);
      const errorMessage = {
        id: Date.now() + 1,
        role: 'error',
        content: 'Nepodařilo se odeslat zprávu. Zkuste to prosím znovu.',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Pokud není userInfo, zobraz UserInfoForm
  if (!userInfo) {
    return (
      <div className="chat-interface">
        <UserInfoForm onSubmit={setUserInfo} />
      </div>
    );
  }

  return (
    <div className="chat-interface">
      <div className="chat-container">
        <div className="chat-messages">
          {messages.length === 0 && !isLoading && (
            <div className="welcome-message">
              <div className="welcome-icon">👋</div>
              <h3>Vítejte v IN CATERING</h3>
              <p>Začněte konverzaci s naším AI Chatbotem.</p>
            </div>
          )}
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="loading-message">
              <div className="loading-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <p>Asistent píše...</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <ChatInput 
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          isConnected={isConnected}
        />
      </div>
    </div>
  );
};

export default ChatInterface; 
