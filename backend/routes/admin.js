const express = require('express');
const router = express.Router();
const chatHistory = require('../services/chatHistoryService');

// GET /api/admin/export-leads?token=TAJNYTOKEN
router.get('/export-leads', (req, res) => {
  const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'TAJNYTOKEN';
  if (req.query.token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const leads = chatHistory.getAllLeads();
  res.json(leads);
});

module.exports = router; 