const db = require('../config/database');

class Pizza {
    static create({ title, image, ingredients, price }) {
        const sql = `
            INSERT INTO pizzas (title, image, ingredients, price, created_at, updated_at)
            VALUES (?, ?, ?, ?, datetime('now'), datetime('now'))
        `;
        const params = [title, image || null, ingredients || null, price];

        return new Promise((resolve, reject) => {
            db.run(sql, params, function (err) {
                if (err) return reject(err);
                Pizza.findById(this.lastID).then(resolve).catch(reject);
            });
        });
    }

    static findAll() {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM pizzas ORDER BY id DESC', [], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM pizzas WHERE id = ?', [id], (err, row) => {
                if (err) return reject(err);
                resolve(row || null);
            });
        });
    }

    static update(id, { title, image, ingredients, price }) {
        const sql = `
            UPDATE pizzas
            SET title = COALESCE(?, title),
                image = COALESCE(?, image),
                ingredients = COALESCE(?, ingredients),
                price = COALESCE(?, price),
                updated_at = datetime('now')
            WHERE id = ?
        `;
        const params = [title, image, ingredients, price, id];

        return new Promise((resolve, reject) => {
            db.run(sql, params, function (err) {
                if (err) return reject(err);
                if (this.changes === 0) return resolve(null);
                Pizza.findById(id).then(resolve).catch(reject);
            });
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM pizzas WHERE id = ?', [id], function (err) {
                if (err) return reject(err);
                resolve(this.changes);
            });
        });
    }
}

module.exports = Pizza;
