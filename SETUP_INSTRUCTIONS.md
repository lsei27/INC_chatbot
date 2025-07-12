# 🔑 Nastavení API klíčů - Bezpečné instrukce

## ⚠️ DŮLEŽITÉ: Bezpečnost
- API klíče se **NIKDY** nezobrazují v dokumentaci
- Všechny klíče jsou uloženy pouze v `config/.env`
- `.env` soubor je vyloučen z Git repozitáře

## 📝 Kroky pro nastavení:

### 1. Spusťte automatický setup
```bash
./setup-with-key.sh
```

### 2. NEBO manuální setup:
```bash
# Vytvořte config/.env soubor
cp config/env.example config/.env

# Upravte config/.env s vašimi klíči:
# OPENAI_API_KEY=sk-your-secret-key-here
# OPENAI_ASSISTANT_ID=asst-your-assistant-id
```

### 3. Získejte Assistant ID
1. Jděte na [OpenAI Platform](https://platform.openai.com/assistants)
2. Vytvořte nového asistenta nebo použijte existujícího
3. Zkopírujte Assistant ID (začíná s `asst_`)
4. Doplňte do `OPENAI_ASSISTANT_ID=`

## 🚀 Spuštění aplikace

### Backend:
```bash
cd backend
npm install
npm start
```

### Frontend:
```bash
cd frontend
npm install
npm start
```

## ✅ Kontrola
- Backend běží na: http://localhost:3001
- Frontend běží na: http://localhost:3000
- Health check: http://localhost:3001/api/health

## 🔒 Bezpečnostní opatření
- ✅ API klíče jsou pouze v `config/.env`
- ✅ `.env` soubor je v `.gitignore`
- ✅ Klíče se nikdy nezobrazují v kódu
- ✅ Dokumentace neobsahuje citlivé údaje 