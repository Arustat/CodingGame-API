const mysql = require('mysql2/promise');
require('dotenv').config();

// Configuration de la connexion
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'confessions_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Création du pool de connexions
const pool = mysql.createPool(dbConfig);

// Test de la connexion
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Connexion à la base de données établie avec succès');
    connection.release();
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error.message);
    if (error.code === 'ER_BAD_DB_ERROR') {
      console.error('La base de données n\'existe pas. Veuillez exécuter npm run init-db');
    }
    process.exit(1);
  }
}

// Test de la connexion au démarrage
testConnection();

module.exports = pool; 