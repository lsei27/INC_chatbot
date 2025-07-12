#!/bin/bash

echo "🤖 AI Chatbot Setup"
echo "===================="

# Kontrola, zda existuje .env soubor
if [ -f "config/.env" ]; then
    echo "⚠️  config/.env již existuje!"
    echo "📝 Pokud chcete přepsat, smažte soubor a spusťte script znovu."
    exit 1
fi

# Vytvoření .env souboru z template
echo "📝 Vytvářím config/.env z template..."
cp config/env.example config/.env

echo "✅ config/.env vytvořen!"

# Kontrola .gitignore
if grep -q "config/.env" .gitignore; then
    echo "✅ .gitignore obsahuje config/.env"
else
    echo "⚠️  Ujistěte se, že config/.env je v .gitignore!"
fi

echo ""
echo "🔑 Nyní musíte vyplnit API klíče v config/.env:"
echo ""
echo "1. Získejte OpenAI API klíč z: https://platform.openai.com/api-keys"
echo "2. Vytvořte asistenta v OpenAI Platform"
echo "3. Zkopírujte Assistant ID"
echo "4. Upravte config/.env s vašimi klíči:"
echo ""
echo "   OPENAI_API_KEY=sk-your-secret-key-here"
echo "   OPENAI_ASSISTANT_ID=asst-your-assistant-id"
echo ""

echo "🚀 Po vyplnění klíčů můžete spustit aplikaci:"
echo "   Backend:  cd backend && npm install && npm start"
echo "   Frontend: cd frontend && npm install && npm start"
echo ""
echo "🔒 BEZPEČNOST: Nikdy necommitovat config/.env do Git!" 