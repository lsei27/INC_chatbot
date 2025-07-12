# Backend Modul - Summary

## Popis
Backend modul poskytuje API pro komunikaci s OpenAI asistentem. Je postaven na Node.js s Express.js frameworkem.

## Struktura souborů

### Hlavní soubory
- `server.js` - Hlavní server soubor s Express.js konfigurací
- `package.json` - Závislosti a skripty

### Routes
- `routes/chat.js` - API endpointy pro chat funkcionalitu

### Services
- `services/chatService.js` - Logika pro komunikaci s OpenAI API

## API Endpointy

### POST /api/chat/message
Odešle zprávu asistentovi a vrátí odpověď.

**Request:**
```json
{
  "message": "Ahoj, jak se máš?",
  "threadId": "thread_abc123" // volitelné
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "threadId": "thread_abc123",
    "userMessage": "Ahoj, jak se máš?",
    "assistantMessage": "Ahoj! Mám se dobře, děkuji za zeptání...",
    "runStatus": "completed"
  }
}
```

### POST /api/chat/thread
Vytvoří nový thread pro konverzaci.

**Response:**
```json
{
  "success": true,
  "data": {
    "threadId": "thread_abc123"
  }
}
```

### GET /api/chat/thread/:threadId
Získá historii zpráv z threadu.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "msg_123",
      "role": "user",
      "content": "Ahoj",
      "createdAt": "2024-01-01T12:00:00Z"
    }
  ]
}
```

## Konfigurace
- API klíče a nastavení v `config/config.js`
- Environment proměnné v `config/env.example`

## Bezpečnost
- Helmet pro HTTP hlavičky
- CORS konfigurace
- Rate limiting
- Input validace

## Spuštění
```bash
cd backend
npm install
npm start
```

## Další kroky
1. Nastavit environment proměnné
2. Otestovat API endpointy
3. Implementovat frontend modul 