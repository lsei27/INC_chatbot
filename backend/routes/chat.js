const express = require('express');
const router = express.Router();

// 🚀 SPRÁVNÝ IMPORT: Načte celou instanci služby, kterou jste exportoval
const chatService = require('../services/chatService');

// --- Routes ---

/**
 * @route   POST /api/chat/thread
 * @desc    Vytvoří nové prázdné konverzační vlákno (thread)
 * @access  Public
 */
router.post('/thread', async (req, res, next) => {
    try {
        // Zavolá metodu na naší naimportované službě
        const thread = await chatService.createThread();
        res.status(201).json({ 
            message: 'Thread byl úspěšně vytvořen',
            threadId: thread.id 
        });
    } catch (error) {
        // Předá chybu centrálnímu error handleru
        next(error);
    }
});

/**
 * @route   POST /api/chat/message
 * @desc    Odešle zprávu asistentovi a získá odpověď
 * @access  Public
 */
router.post('/message', async (req, res, next) => {
    try {
        const { message, threadId } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Chybí zpráva (message) v těle požadavku' });
        }

        const response = await chatService.sendMessage(message, threadId);
        res.json(response);

    } catch (error) {
        next(error);
    }
});

/**
 * @route   GET /api/chat/:threadId/messages
 * @desc    Získá všechny zprávy z daného vlákna
 * @access  Public
 */
router.get('/:threadId/messages', async (req, res, next) => {
    try {
        const { threadId } = req.params;
        const messages = await chatService.getThreadMessages(threadId);
        res.json(messages);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
