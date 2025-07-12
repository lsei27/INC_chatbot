const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Automatická inicializace tabulek
async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS chat_leads (
      id SERIAL PRIMARY KEY,
      threadId VARCHAR(100) NOT NULL,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL,
      phone VARCHAR(40) NOT NULL,
      createdAt TIMESTAMP NOT NULL DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      threadId VARCHAR(100) NOT NULL,
      role VARCHAR(20) NOT NULL,
      content TEXT NOT NULL,
      timestamp TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);
}

initDb().catch(e => console.error('DB init error:', e));

module.exports = pool; 
