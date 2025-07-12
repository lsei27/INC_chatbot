const OpenAI = require('openai');
const config = require('../../config/config');
const chatHistory = require('./chatHistoryService');

// Inicializace OpenAI klienta
const openai = new OpenAI({
    apiKey: config.openai.apiKey,
    organization: config.openai.organization
});

class ChatService {
    constructor() {
        this.assistantId = config.openai.assistantId;
        this.model = config.openai.model;
    }

    // Vytvořit nový thread
    async createThread() {
        try {
            const thread = await openai.beta.threads.create();
            return thread;
        } catch (error) {
            console.error('Error creating thread:', error);
            throw new Error('Nepodařilo se vytvořit nový thread');
        }
    }

    // Odeslat zprávu asistentovi
    async sendMessage(message, threadId) {
        try {
            // Vytvořit thread pokud neexistuje
            if (!threadId) {
                const thread = await this.createThread();
                threadId = thread.id;
            }

            // Přidat zprávu do threadu
            await openai.beta.threads.messages.create(
                threadId,
                {
                    role: "user",
                    content: message
                }
            );

            // Uložit uživatelskou zprávu do historie
            await chatHistory.saveMessage(threadId, 'user', message, new Date().toISOString());

            // Spustit run s asistentem
            const run = await openai.beta.threads.runs.create(
                threadId,
                {
                    assistant_id: this.assistantId
                }
            );

            // Počkat na dokončení run
            const result = await this.waitForRunCompletion(threadId, run.id);

            // Získat odpověď asistenta
            const messages = await openai.beta.threads.messages.list(threadId);
            const assistantMessage = messages.data.find(msg => 
                msg.role === 'assistant' && 
                msg.run_id === run.id
            );

            // Uložit odpověď asistenta do historie
            if (assistantMessage) {
                await chatHistory.saveMessage(
                    threadId,
                    'assistant',
                    assistantMessage.content[0]?.text?.value || '',
                    new Date().toISOString()
                );
            }

            return {
                threadId,
                userMessage: message,
                assistantMessage: assistantMessage?.content[0]?.text?.value || 'Nepodařilo se získat odpověď',
                runStatus: result.status
            };

        } catch (error) {
            console.error('Error sending message:', error);
            throw new Error('Nepodařilo se odeslat zprávu asistentovi');
        }
    }

    // Počkat na dokončení run
    async waitForRunCompletion(threadId, runId) {
        const maxAttempts = 30; // 30 sekund
        let attempts = 0;

        while (attempts < maxAttempts) {
            const run = await openai.beta.threads.runs.retrieve(threadId, runId);
            
            if (run.status === 'completed') {
                return run;
            } else if (run.status === 'failed' || run.status === 'cancelled') {
                throw new Error(`Run failed with status: ${run.status}`);
            }

            // Počkat 1 sekundu před dalším pokusem
            await new Promise(resolve => setTimeout(resolve, 1000));
            attempts++;
        }

        throw new Error('Timeout waiting for run completion');
    }

    // Získat zprávy z threadu
    async getThreadMessages(threadId) {
        try {
            return await chatHistory.getMessagesByThread(threadId);
        } catch (error) {
            console.error('Error getting thread messages:', error);
            throw new Error('Nepodařilo se získat zprávy z threadu');
        }
    }
}

// --- ZMĚNA ZDE ---
// Exportujeme třídu (šablonu), nikoli její instanci.
module.exports = ChatService;