const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbFile = path.join(__dirname, 'pizza.sqlite');
const db = new sqlite3.Database(dbFile, (err) => {
    if (err) {
        console.error('Could not connect to SQLite (src DB)', err);
        process.exit(1);
    }
    console.log('Connected to src SQLite DB:', dbFile);
});

const initSql = `
CREATE TABLE IF NOT EXISTS pizzas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    image TEXT,
    ingredients TEXT NOT NULL,
    price REAL NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);
`;

db.run(initSql, (err) => {
    if (err) {
        console.error('Failed to initialize src DB', err);
        process.exit(1);
    }
});

module.exports = db;
