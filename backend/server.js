const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
require('dotenv').config({ path: '../config/.env' });

// Načíst konfiguraci s validací
let config;
try {
    config = require('../config/config');
} catch (error) {
    console.error('❌ Chyba v konfiguraci:', error.message);
    console.error('📝 Ujistěte se, že máte správně nastavené environment proměnné v config/.env');
    console.error('🔑 Potřebné proměnné: OPENAI_API_KEY, OPENAI_ASSISTANT_ID');
    process.exit(1);
}

const chatRoutes = require('./routes/chat');
const adminRoutes = require('./routes/admin');

const app = express();
app.set('trust proxy', 1); // Důvěřuj první proxy (např. Render)

// --- OPRAVA CORS ZDE ---
// Definujeme povolené domény přímo zde, abychom měli jistotu, že se použijí.
const corsOptions = {
    origin: [
        'https://lsei27.github.io', // Vaše produkční adresa na GitHub Pages
        'http://localhost:3000',    // Pro lokální vývoj (např. React)
        'http://localhost:5173',    // Pro lokální vývoj (např. Vite)
        'http://127.0.0.1:5500'     // Pro lokální spouštění přes Live Server
    ],
    optionsSuccessStatus: 200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE" // Povolí všechny běžné metody
};

// Middleware
app.use(helmet());
// Použijeme naši novou, přímo definovanou konfiguraci CORS
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(morgan('combined'));

// Rate limiting
const limiter = rateLimit(config.security.rateLimit);
app.use('/api/', limiter);

// Routes
app.use('/api/chat', chatRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        config: {
            hasOpenAIKey: !!config.openai.apiKey,
            hasAssistantId: !!config.openai.assistantId,
            model: config.openai.model
        }
    });
});

// Error handling
app.use((err, req, res, next) => {
    console.error('❌ Server error:', err.stack);
    
    // Nezobrazovat citlivé informace v produkci
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    res.status(500).json({ 
        error: 'Internal Server Error',
        message: isDevelopment ? err.message : 'Nastala neočekávaná chyba serveru',
        timestamp: new Date().toISOString()
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: 'Endpoint nebyl nalezen',
        path: req.originalUrl
    });
});

const PORT = config.server.port;

app.listen(PORT, () => {
    console.log(`🚀 Server běží na portu ${PORT}`);
    console.log(`📡 API dostupné na http://localhost:${PORT}/api`);
    console.log(`🔒 Rate limiting: ${config.security.rateLimit.max} požadavků za ${config.security.rateLimit.windowMs / 60000} minut`);
    console.log(`🤖 OpenAI model: ${config.openai.model}`);
    console.log(`✅ Konfigurace načtena úspěšně`);
});