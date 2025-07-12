const express = require('express');
const router = express.Router();
const chatService = require('../services/chatService');

// POST /api/chat/message - Odeslat zprávu asistentovi
router.post('/message', async (req, res) => {
    try {
        const { message, threadId } = req.body;
        
        if (!message || typeof message !== 'string') {
            return res.status(400).json({
                error: 'Invalid message',
                message: 'Zpráva je povinná a musí být string'
            });
        }

        const result = await chatService.sendMessage(message, threadId);
        
        res.json({
            success: true,
            data: result
        });
        
    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({
            error: 'Chat error',
            message: error.message
        });
    }
});

// POST /api/chat/thread - Vytvořit nový thread
router.post('/thread', async (req, res) => {
    try {
        const thread = await chatService.createThread();
        
        res.json({
            success: true,
            data: { threadId: thread.id }
        });
        
    } catch (error) {
        console.error('Thread creation error:', error);
        res.status(500).json({
            error: 'Thread creation error',
            message: error.message
        });
    }
});

// GET /api/chat/thread/:threadId - Získat historii threadu
router.get('/thread/:threadId', async (req, res) => {
    try {
        const { threadId } = req.params;
        const messages = await chatService.getThreadMessages(threadId);
        
        res.json({
            success: true,
            data: messages
        });
        
    } catch (error) {
        console.error('Thread messages error:', error);
        res.status(500).json({
            error: 'Thread messages error',
            message: error.message
        });
    }
});

module.exports = router; 