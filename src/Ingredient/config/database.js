const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbFile = path.join(__dirname, 'ingredient.sqlite');
const db = new sqlite3.Database(dbFile, (err) => {
    if (err) {
        console.error('Could not connect to SQLite (Ingredient DB)', err);
        process.exit(1);
    }
    console.log('Connected to Ingredient SQLite DB:', dbFile);
});

const initSql = `
CREATE TABLE IF NOT EXISTS ingredients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    price REAL,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);
`;

db.run(initSql, (err) => {
    if (err) {
        console.error('Failed to initialize Ingredient DB', err);
        process.exit(1);
    }
});

module.exports = db;
