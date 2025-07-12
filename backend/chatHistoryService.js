const db = require('./db');

// Uloží lead do tabulky chat_leads v PostgreSQL
async function saveLead(threadId, name, email, phone) {
  await db.query(
    'INSERT INTO chat_leads (threadId, name, email, phone, createdAt) VALUES ($1, $2, $3, $4, NOW())',
    [threadId, name, email, phone]
  );
}

// Získá lead podle threadId
async function getLeadByThread(threadId) {
  const res = await db.query('SELECT * FROM chat_leads WHERE threadId = $1 LIMIT 1', [threadId]);
  return res.rows[0] || null;
}

// Uloží zprávu do tabulky messages v PostgreSQL
async function saveMessage(threadId, role, content, timestamp) {
  await db.query(
    'INSERT INTO messages (threadId, role, content, timestamp) VALUES ($1, $2, $3, $4)',
    [threadId, role, content, timestamp]
  );
}

// Vrátí všechny leady z tabulky chat_leads
async function getAllLeads() {
  const res = await db.query('SELECT * FROM chat_leads ORDER BY createdAt DESC');
  return res.rows;
}

// Vrátí všechny zprávy z tabulky messages
async function getAllMessages() {
  const res = await db.query('SELECT * FROM messages ORDER BY id ASC');
  return res.rows;
}

// Vrátí všechny zprávy pro daný threadId
async function getMessagesByThread(threadId) {
  const res = await db.query('SELECT * FROM messages WHERE threadId = $1 ORDER BY id ASC', [threadId]);
  return res.rows;
}

module.exports = {
  saveLead,
  getLeadByThread,
  saveMessage,
  getAllLeads,
  getAllMessages,
  getMessagesByThread,
}; 