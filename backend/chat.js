const express = require('express');
const router = express.Router();

// --- OPRAVA ZDE ---
// 1. Importujeme "recept" (třídu) a uložíme ho do proměnné s velkým 'C'.
const ChatService = require('../services/chatService');
// 2. Podle receptu vytvoříme funkční objekt, se kterým budeme pracovat.
const chatService = new ChatService();
const chatHistory = require('../services/chatHistoryService');

// --- ROUTES ---

/**
 * @route   POST /api/chat/thread
 * @desc    Vytvoří nové prázdné konverzační vlákno (thread).
 * @access  Public
 */
router.post('/thread', async (req, res, next) => {
    try {
        const { name, email, phone } = req.body;
        const thread = await chatService.createThread();

        // Uložit lead do DB, pokud jsou údaje vyplněné
        if (name && email && phone) {
            await chatHistory.saveLead(thread.id, name, email, phone);
        }

        res.status(201).json({
            success: true,
            message: 'Thread byl úspěšně vytvořen.',
            data: { threadId: thread.id }
        });
    } catch (error) {
        console.error('Thread creation error:', error.message);
        next(error);
    }
});

/**
 * @route   POST /api/chat/message
 * @desc    Odešle zprávu do existujícího vlákna a získá odpověď.
 * @access  Public
 */
router.post('/message', async (req, res, next) => {
    try {
        // Zpráva a ID vlákna se posílají v těle požadavku
        const { message, threadId } = req.body;
        
        // Základní validace
        if (!message || typeof message !== 'string') {
            return res.status(400).json({
                success: false,
                error: 'Chybný požadavek',
                message: 'Pole "message" je povinné a musí být textový řetězec.'
            });
        }
        
        if (!threadId) {
             return res.status(400).json({
                success: false,
                error: 'Chybný požadavek',
                message: 'Pole "threadId" je povinné.'
            });
        }

        const result = await chatService.sendMessage(message, threadId);
        
        res.json({
            success: true,
            data: result
        });
        
    } catch (error) {
        console.error('Chat message error:', error.message);
        next(error);
    }
});

/**
 * @route   GET /api/chat/thread/:threadId
 * @desc    Získá historii zpráv z konkrétního vlákna.
 * @access  Public
 */
router.get('/thread/:threadId', async (req, res, next) => {
    try {
        const { threadId } = req.params;
        const messages = await chatService.getThreadMessages(threadId);
        
        res.json({
            success: true,
            data: messages
        });
        
    } catch (error) {
        console.error('Get thread messages error:', error.message);
        next(error);
    }
});

module.exports = router;