const express = require('express');
const router = express.Router();
const chatHistory = require('../services/chatHistoryService');

// GET /api/admin/export-leads?token=TAJNYTOKEN
router.get('/export-leads', async (req, res) => {
  const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'TAJNYTOKEN';
  if (req.query.token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const leads = await chatHistory.getAllLeads();
  res.json(leads);
});

// GET /api/admin/export-messages?token=TAJNYTOKEN
router.get('/export-messages', async (req, res) => {
  const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'TAJNYTOKEN';
  if (req.query.token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  // JOIN messages + chat_leads podle threadId v PostgreSQL
  const db = require('../services/db');
  const result = await db.query(`
    SELECT m.id, m.threadId, m.role, m.content, m.timestamp,
           l.name, l.email, l.phone, l.createdAt as leadCreatedAt
    FROM messages m
    LEFT JOIN chat_leads l ON m.threadId = l.threadId
    ORDER BY m.id ASC
  `);
  res.json(result.rows);
});

module.exports = router; 