import axios from 'axios';

// Konfigurace axios
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://inc-chatbot.onrender.com/api'
  : 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // zvýšeno na 60 sekund
  headers: {
    'Content-Type': 'application/json',
  },
});

class ChatService {
  // Vytvořit nový thread
  static async createThread(userInfo) {
    try {
      const response = await api.post('/chat/thread', userInfo || {});
      return response.data;
    } catch (error) {
      console.error('Error creating thread:', error);
      throw new Error('Nepodařilo se vytvořit nový thread');
    }
  }

  // Odeslat zprávu
  static async sendMessage(message, threadId) {
    try {
      const response = await api.post('/chat/message', {
        message,
        threadId
      });
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      
      if (error.response) {
        // Server vrátil chybu
        const errorMessage = error.response.data?.message || 'Nepodařilo se odeslat zprávu';
        throw new Error(errorMessage);
      } else if (error.request) {
        // Síťová chyba
        throw new Error('Nepodařilo se připojit k serveru');
      } else {
        // Jiná chyba
        throw new Error('Nastala neočekávaná chyba');
      }
    }
  }

  // Získat historii zpráv
  static async getThreadMessages(threadId) {
    try {
      const response = await api.get(`/chat/thread/${threadId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting thread messages:', error);
      throw new Error('Nepodařilo se načíst historii zpráv');
    }
  }

  // Kontrola připojení k serveru
  static async checkHealth() {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      throw new Error('Server není dostupný');
    }
  }
}

export default ChatService; 
