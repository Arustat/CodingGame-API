const mysql = require('mysql2/promise');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

async function initializeDatabase() {
  let connection;
  try {
    // Connexion à MySQL sans spécifier de base de données
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || ''
    });

    console.log('Connexion à MySQL établie');

    // Création de la base de données
    const dbName = process.env.DB_NAME || 'confessions_db';
    await connection.query(`DROP DATABASE IF EXISTS ${dbName}`);
    await connection.query(`CREATE DATABASE ${dbName}`);
    console.log(`Base de données ${dbName} créée`);

    // Utilisation de la base de données
    await connection.query(`USE ${dbName}`);

    // Création des tables
    await connection.query(`
      CREATE TABLE confessions (
        id INT PRIMARY KEY AUTO_INCREMENT,
        text TEXT NOT NULL,
        intensity INT NOT NULL CHECK (intensity BETWEEN 1 AND 10),
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await connection.query(`
      CREATE TABLE tags (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(50) NOT NULL UNIQUE
      )
    `);

    await connection.query(`
      CREATE TABLE confession_tags (
        id INT PRIMARY KEY AUTO_INCREMENT,
        confession_id INT NOT NULL,
        tag_id INT NOT NULL,
        FOREIGN KEY (confession_id) REFERENCES confessions(id) ON DELETE CASCADE,
        FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
      )
    `);

    await connection.query(`
      CREATE TABLE responses (
        id INT PRIMARY KEY AUTO_INCREMENT,
        confession_id INT NOT NULL,
        text TEXT NOT NULL,
        is_psychologist BOOLEAN NOT NULL DEFAULT FALSE,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (confession_id) REFERENCES confessions(id) ON DELETE CASCADE
      )
    `);

    // Insertion des tags prédéfinis
    await connection.query(`
      INSERT INTO tags (name) VALUES 
      ('culpabilité'),
      ('honte'),
      ('peur'),
      ('colère'),
      ('tristesse'),
      ('joie'),
      ('amour'),
      ('haine'),
      ('mensonge'),
      ('trahison'),
      ('jalousie'),
      ('envie'),
      ('doute'),
      ('confiance'),
      ('espoir')
    `);

    console.log('Base de données initialisée avec succès !');

  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Exécution de l'initialisation
initializeDatabase()
  .then(() => {
    console.log('Initialisation terminée avec succès');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Erreur lors de l\'initialisation:', error);
    process.exit(1);
  }); 