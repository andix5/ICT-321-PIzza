// entities/Pizza.js
const db = require('../config/database');
// On importe la connexion à la base de données (SQLite ici)

// Définition de la classe Pizza
// 👉 Représente un "produit" dans ta base de données
// 👉 Tu pourras le renommer en "Pizza" si tu veux
class Pizza {

    // CREATE : Ajouter un nouveau produit dans la DB
    static create({ title, image, ingredients, price }) {
        // La requête SQL insère un nouvel enregistrement dans la table "products"
        // created_at et updated_at sont gérés automatiquement avec datetime('now')
        const sql = `INSERT INTO pizzas (title, image, ingredients, price, created_at, updated_at)
                 VALUES (?, ?, ?, ?, datetime('now'), datetime('now'))`;

        // Les valeurs à insérer (si description ou imageUrl non fournis → null)
        const params = [title, image || null, ingredients || null, price];

        return new Promise((resolve, reject) => {
            db.run(sql, params, function (err) {
                if (err) return reject(err);
                // Une fois inséré, on récupère la ligne créée avec son ID
                Pizza.findById(this.lastID).then(resolve).catch(reject);
            });
        });
    }

    // READ : Récupérer tous les produits
    static findAll() {
        const sql = `SELECT * FROM pizzas ORDER BY id DESC`;
        // Retourne tous les produits par ordre décroissant d’ID
        return new Promise((resolve, reject) => {
            db.all(sql, [], (err, rows) => {
                if (err) return reject(err);
                resolve(rows); // rows = tableau de produits
            });
        });
    }

    // READ : Récupérer un produit par son ID
    static findById(id) {
        const sql = `SELECT * FROM pizzas WHERE id = ?`;
        return new Promise((resolve, reject) => {
            db.get(sql, [id], (err, row) => {
                if (err) return reject(err);
                resolve(row || null); // retourne null si pas trouvé
            });
        });
    }

    // UPDATE : Modifier un produit existant
    static update(id, { title, image, ingredients, price }) {
        const sql = `
      UPDATE pizzas
      SET title = COALESCE(?, title),         -- met à jour seulement si une valeur est fournie
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
                if (this.changes === 0) return resolve(null); // aucun produit mis à jour
                Pizza.findById(id).then(resolve).catch(reject);
            });
        });
    }

    // DELETE : Supprimer un produit
    static delete(id) {
        const sql = `DELETE FROM pizzas WHERE id = ?`;
        return new Promise((resolve, reject) => {
            db.run(sql, [id], function (err) {
                if (err) return reject(err);
                resolve(this.changes); // retourne le nombre de lignes supprimées (0 ou 1)
            });
        });
    }
}

module.exports = Pizza; // On exporte la classe pour pouvoir l'utiliser dans les controllers
