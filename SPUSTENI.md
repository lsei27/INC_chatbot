# 🚀 Spuštění AI Chatbot Aplikace

## ✅ Konfigurace je kompletní!

### Nastavené klíče:
- **API Key**: Nastaven v config/.env
- **Assistant ID**: `asst_mzd5Uaa9viQyW5yXoIOWLQFr`

## 📋 Požadavky

### Node.js a npm
```bash
# Zkontrolujte, zda máte Node.js
node --version
npm --version

# Pokud nemáte, nainstalujte z: https://nodejs.org/
```

## 🚀 Spuštění aplikace

### 1. Backend (Terminál 1)
```bash
cd backend
npm install
npm start
```

**Očekávaný výstup:**
```
🚀 Server běží na portu 3001
📡 API dostupné na http://localhost:3001/api
🔒 Rate limiting: 100 požadavků za 15 minut
🤖 OpenAI model: gpt-4o-mini
✅ Konfigurace načtena úspěšně
```

### 2. Frontend (Terminál 2)
```bash
cd frontend
npm install
npm start
```

**Očekávaný výstup:**
```
Compiled successfully!

You can now view chatbot-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

## ✅ Kontrola funkčnosti

### Health Check
```bash
curl http://localhost:3001/api/health
```

**Očekávaná odpověď:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "config": {
    "hasOpenAIKey": true,
    "hasAssistantId": true,
    "model": "gpt-4o-mini"
  }
}
```

## 🌐 Přístup k aplikaci

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api
- **Health Check**: http://localhost:3001/api/health

## 🔧 Řešení problémů

### Backend se nespustí
```bash
# Zkontrolujte .env soubor
cat config/.env

# Zkontrolujte logy
npm start
```

### Frontend se nespustí
```bash
# Zkontrolujte, zda backend běží
curl http://localhost:3001/api/health

# Restartujte frontend
npm start
```

## 🔒 Bezpečnost
- ✅ API klíče jsou v `config/.env`
- ✅ `.env` soubor je v `.gitignore`
- ✅ Rate limiting je aktivní
- ✅ CORS je konfigurováno

## 📱 Použití aplikace
1. Otevřete http://localhost:3000
2. Počkejte na připojení k backend
3. Začněte chatovat s asistentem
4. Zprávy se ukládají v threadu 