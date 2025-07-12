# AI Chatbot s OpenAI Asistentem

Moderní chatbot aplikace pro komunikaci s OpenAI asistentem přes webové rozhraní.

## 🚀 Funkce

- **Real-time chat** s OpenAI asistentem
- **Moderní UI** s glassmorphism designem
- **Responsivní design** pro všechna zařízení
- **Thread management** pro konverzace
- **Error handling** a loading stavy
- **Bezpečnostní prvky** (rate limiting, CORS)

## 📁 Struktura projektu

```
chatbot-project/
├── backend/           # Node.js API server
│   ├── routes/       # API endpointy
│   ├── services/     # Business logika
│   └── server.js     # Hlavní server
├── frontend/          # React aplikace
│   ├── src/
│   │   ├── components/  # React komponenty
│   │   ├── services/    # API komunikace
│   │   └── App.js       # Hlavní aplikace
│   └── public/       # Statické soubory
├── config/           # Konfigurační soubory
│   ├── config.js     # API nastavení
│   └── env.example   # Environment template
└── docs/             # Dokumentace
```

## 🛠️ Instalace

### 1. Klonování projektu
```bash
git clone <repository-url>
cd chatbot-project
```

### 2. Backend setup
```bash
cd backend
npm install
```

### 3. Frontend setup
```bash
cd frontend
npm install
```

### 4. Konfigurace
```bash
# Automatický setup (doporučeno)
./setup-secure.sh

# NEBO základní setup:
./setup.sh

# NEBO manuální setup:
# Zkopírujte environment template
cp config/env.example config/.env

# ⚠️ DŮLEŽITÉ: Upravte config/.env s vašimi API klíči
# NIKDY necommitovat .env soubor do Git!
```

## 🚀 Spuštění

### ✅ Konfigurace je kompletní!
- **API Key**: Nastaven
- **Assistant ID**: `asst_mzd5Uaa9viQyW5yXoIOWLQFr`

### Development mode

**Backend:**
```bash
cd backend
npm install
npm start
# Server běží na http://localhost:3001
```

**Frontend:**
```bash
cd frontend
npm install
npm start
# Aplikace běží na http://localhost:3000
```

### 📋 Podrobné instrukce
Viz `SPUSTENI_APLIKACE.md` pro kompletní návod.

### Produkce
```bash
# Build frontend
cd frontend
npm run build

# Serve backend
cd ../backend
npm start
```

## 🔧 Konfigurace

### OpenAI API
1. Získejte API klíč z [OpenAI Platform](https://platform.openai.com/)
2. Vytvořte asistenta v OpenAI Platform
3. Zkopírujte Assistant ID
4. Nastavte environment proměnné

### Environment proměnné
```bash
# OpenAI
OPENAI_API_KEY=sk-...
OPENAI_ORG_ID=org-...
OPENAI_ASSISTANT_ID=asst_...

# Server
PORT=3001
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

## 📚 API Dokumentace

### Endpointy

**POST /api/chat/thread**
- Vytvoří nový thread pro konverzaci
- Response: `{ threadId: "thread_abc123" }`

**POST /api/chat/message**
- Odešle zprávu asistentovi
- Body: `{ message: "text", threadId: "thread_abc123" }`
- Response: `{ assistantMessage: "response" }`

**GET /api/chat/thread/:threadId**
- Získá historii zpráv
- Response: `[{ role: "user", content: "text", timestamp: "..." }]`

**GET /api/health**
- Health check endpoint
- Response: `{ status: "OK", timestamp: "..." }`

## 🎨 UI Komponenty

### ChatInterface
- Hlavní chat kontejner
- Auto-scroll na nové zprávy
- Loading animace

### ChatMessage
- Zobrazení zpráv (user/assistant/error)
- Časové razítko
- Různé ikony pro role

### ChatInput
- Auto-resize textarea
- Enter pro odeslání
- Status indikátory

## 🔒 Bezpečnost

- **API klíče** - Uloženy v environment proměnných, nikdy v kódu
- **Rate limiting** - 100 požadavků za 15 minut
- **CORS** - Konfigurované pro frontend
- **Helmet** - HTTP hlavičky
- **Input validace** - Kontrola vstupů
- **Error sanitization** - Bezpečné chybové zprávy
- **.gitignore** - Citlivé soubory vyloučeny z repozitáře

## 📱 Responsivní Design

- **Desktop**: 1200px max-width
- **Tablet**: 768px breakpoint
- **Mobile**: 480px breakpoint
- **Touch-friendly** tlačítka a inputy

## 🐛 Debugging

### Backend
```bash
# Logy v konzoli
npm run dev  # Nodemon pro auto-restart
```

### Frontend
```bash
# React DevTools
# Network tab pro API calls
# Console pro chyby
```

## 📈 Monitoring

- **Health checks** - `/api/health`
- **Error logging** - Console a network
- **Performance** - React DevTools
- **API monitoring** - Network tab

## 🚀 Nasazení

### Vercel (Frontend)
```bash
cd frontend
npm run build
# Deploy build/ složky
```

### Railway/Heroku (Backend)
```bash
cd backend
# Nastavte environment proměnné
# Deploy Node.js aplikace
```

### Docker
```dockerfile
# Backend Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork repository
2. Vytvořte feature branch
3. Commit změny
4. Push do branch
5. Otevřete Pull Request

## 📄 Licence

MIT License - viz LICENSE soubor

## 🆘 Support

- **Dokumentace**: `/docs/` složka
- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions

## 🔄 Roadmap

### V1.1
- [ ] Autentifikace uživatelů
- [ ] Historie chatů
- [ ] Export konverzací

### V1.2
- [ ] WebSocket pro real-time
- [ ] File uploads
- [ ] Multi-language support

### V2.0
- [ ] Multi-tenant architektura
- [ ] Advanced AI features
- [ ] Analytics dashboard 