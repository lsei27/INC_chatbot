// Konfigurace pro OpenAI API a asistenta
const config = {
    // OpenAI API konfigurace
    openai: {
        apiKey: process.env.OPENAI_API_KEY,
        organization: process.env.OPENAI_ORG_ID,
        assistantId: process.env.OPENAI_ASSISTANT_ID,
        model: 'gpt-4.1'
    },
    
    // Server konfigurace
    server: {
        port: process.env.PORT || 3001,
        cors: {
            origin: [
              'http://localhost:3000',
              'https://lsei27.github.io/INC_chatbot/'
            ],
            credentials: true
        }
    },
    
    // Chat konfigurace
    chat: {
        maxTokens: 1000,
        temperature: 0.7,
        timeout: 30000 // 30 sekund
    },
    
    // Bezpečnost
    security: {
        rateLimit: {
            windowMs: 15 * 60 * 1000, // 15 minut
            max: 100 // maximálně 100 požadavků za okno
        }
    }
};

// Validace povinných environment proměnných
const validateConfig = () => {
    const requiredEnvVars = [
        'OPENAI_API_KEY',
        'OPENAI_ASSISTANT_ID'
    ];

    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
        throw new Error(`Chybí povinné environment proměnné: ${missingVars.join(', ')}`);
    }

    // Validace formátu API klíče
    if (!process.env.OPENAI_API_KEY?.startsWith('sk-')) {
        throw new Error('OPENAI_API_KEY musí začínat s "sk-"');
    }

    // Validace formátu Assistant ID
    if (!process.env.OPENAI_ASSISTANT_ID?.startsWith('asst_')) {
        throw new Error('OPENAI_ASSISTANT_ID musí začínat s "asst_"');
    }
};

// Spustit validaci při načtení modulu
validateConfig();

module.exports = config; 
