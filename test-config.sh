#!/bin/bash

echo "🧪 Test konfigurace AI Chatbot"
echo "================================"

# Kontrola .env souboru
if [ -f "config/.env" ]; then
    echo "✅ config/.env existuje"
    
    # Kontrola API klíče
    if grep -q "OPENAI_API_KEY=" config/.env; then
        echo "✅ OpenAI API klíč je nastaven"
    else
        echo "❌ OpenAI API klíč chybí"
    fi
    
    # Kontrola Assistant ID
    if grep -q "asst_mzd5Uaa9viQyW5yXoIOWLQFr" config/.env; then
        echo "✅ Assistant ID je nastaven"
    else
        echo "❌ Assistant ID chybí"
    fi
else
    echo "❌ config/.env neexistuje"
    echo "💡 Spusťte: ./setup-with-key.sh"
    exit 1
fi

# Kontrola .gitignore
if grep -q "config/.env" .gitignore; then
    echo "✅ .env je v .gitignore"
else
    echo "❌ .env není v .gitignore"
fi

# Kontrola Node.js
if command -v node &> /dev/null; then
    echo "✅ Node.js je nainstalován"
    node --version
else
    echo "❌ Node.js není nainstalován"
    echo "💡 Stáhněte z: https://nodejs.org/"
fi

# Kontrola npm
if command -v npm &> /dev/null; then
    echo "✅ npm je nainstalován"
    npm --version
else
    echo "❌ npm není nainstalován"
fi

echo ""
echo "🚀 Pokud jsou všechny kontroly ✅, můžete spustit aplikaci:"
echo "   Backend:  cd backend && npm install && npm start"
echo "   Frontend: cd frontend && npm install && npm start" 