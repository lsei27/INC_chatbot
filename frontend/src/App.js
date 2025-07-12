import React, { useState } from 'react';
import './App.css';
import ChatInterface from './components/ChatInterface';
import Header from './components/Header';

function App() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <ChatInterface isConnected={isConnected} setIsConnected={setIsConnected} />
      </main>
    </div>
  );
}

export default App; 