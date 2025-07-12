const Database = require('better-sqlite3');
const path = require('path');

// Inicializace databáze v souboru (v rootu backendu)
const db = new Database(path.join(__dirname, '../../chat_history.db'));

// Vytvoření tabulky messages, pokud neexistuje
const createTable = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  threadId TEXT NOT NULL,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  timestamp TEXT NOT NULL
);
`;
db.exec(createTable);

const saveMessage = (threadId, role, content, timestamp) => {
  const stmt = db.prepare(
    'INSERT INTO messages (threadId, role, content, timestamp) VALUES (?, ?, ?, ?);'
  );
  stmt.run(threadId, role, content, timestamp);
};

const getAllMessages = () => {
  const stmt = db.prepare('SELECT * FROM messages ORDER BY id ASC;');
  return stmt.all();
};

const getMessagesByThread = (threadId) => {
  const stmt = db.prepare('SELECT * FROM messages WHERE threadId = ? ORDER BY id ASC;');
  return stmt.all(threadId);
};

// Vytvoření tabulky chat_leads, pokud neexistuje
const createLeadsTable = `
CREATE TABLE IF NOT EXISTS chat_leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  threadId TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  createdAt TEXT NOT NULL
);
`;
db.exec(createLeadsTable);

const saveLead = (threadId, name, email, phone) => {
  const stmt = db.prepare(
    'INSERT INTO chat_leads (threadId, name, email, phone, createdAt) VALUES (?, ?, ?, ?, ?);'
  );
  stmt.run(threadId, name, email, phone, new Date().toISOString());
};

const getLeadByThread = (threadId) => {
  const stmt = db.prepare('SELECT * FROM chat_leads WHERE threadId = ? LIMIT 1;');
  return stmt.get(threadId);
};

module.exports = {
  saveMessage,
  getAllMessages,
  getMessagesByThread,
  saveLead,
  getLeadByThread,
}; 