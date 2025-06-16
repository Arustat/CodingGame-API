const db = require('../config/database');

class Confession {
  static async create(confessionData) {
    const { text, intensity, tags } = confessionData;
    console.log('Tentative de connexion à la base de données...');
    const connection = await db.getConnection();
    console.log('Connexion à la base de données établie');
    
    try {
      console.log('Début de la transaction...');
      await connection.beginTransaction();
      
      // Insérer la confession
      console.log('Insertion de la confession...');
      const [result] = await connection.execute(
        'INSERT INTO confessions (text, intensity, created_at) VALUES (?, ?, NOW())',
        [text, intensity]
      );
      
      const confessionId = result.insertId;
      console.log('Confession insérée avec l\'ID:', confessionId);
      
      // Insérer les tags
      if (tags && tags.length > 0) {
        console.log('Insertion des tags:', tags);
        // Récupérer les IDs des tags
        const placeholders = tags.map(() => '?').join(',');
        const [tagRows] = await connection.execute(
          `SELECT id FROM tags WHERE name IN (${placeholders})`,
          tags
        );
        
        if (tagRows.length > 0) {
          const tagValues = tagRows.map(tag => [confessionId, tag.id]);
          await connection.execute(
            'INSERT INTO confession_tags (confession_id, tag_id) VALUES ?',
            [tagValues]
          );
          console.log('Tags insérés avec succès');
        }
      }
      
      console.log('Validation de la transaction...');
      await connection.commit();
      console.log('Transaction validée');
      return confessionId;
    } catch (error) {
      console.error('Erreur lors de la création de la confession:', error);
      console.log('Annulation de la transaction...');
      await connection.rollback();
      console.log('Transaction annulée');
      throw error;
    } finally {
      console.log('Libération de la connexion...');
      connection.release();
      console.log('Connexion libérée');
    }
  }

  static async findAll() {
    console.log('Récupération de toutes les confessions...');
    const [rows] = await db.execute(`
      SELECT c.*, GROUP_CONCAT(t.name) as tags
      FROM confessions c
      LEFT JOIN confession_tags ct ON c.id = ct.confession_id
      LEFT JOIN tags t ON ct.tag_id = t.id
      GROUP BY c.id
      ORDER BY c.created_at DESC
    `);
    console.log(`${rows.length} confessions trouvées`);
    return rows;
  }

  static async findById(id) {
    console.log('Récupération de la confession avec l\'ID:', id);
    const [rows] = await db.execute(`
      SELECT c.*, GROUP_CONCAT(t.name) as tags
      FROM confessions c
      LEFT JOIN confession_tags ct ON c.id = ct.confession_id
      LEFT JOIN tags t ON ct.tag_id = t.id
      WHERE c.id = ?
      GROUP BY c.id
    `, [id]);
    console.log('Confession trouvée:', rows[0] ? 'oui' : 'non');
    return rows[0];
  }

  static async update(id, confessionData) {
    const { text, intensity, tags } = confessionData;
    console.log('Mise à jour de la confession avec l\'ID:', id);
    const connection = await db.getConnection();
    
    try {
      await connection.beginTransaction();
      
      // Mettre à jour la confession
      console.log('Mise à jour des données de la confession...');
      await connection.execute(
        'UPDATE confessions SET text = ?, intensity = ? WHERE id = ?',
        [text, intensity, id]
      );
      
      // Supprimer les anciens tags
      console.log('Suppression des anciens tags...');
      await connection.execute(
        'DELETE FROM confession_tags WHERE confession_id = ?',
        [id]
      );
      
      // Insérer les nouveaux tags
      if (tags && tags.length > 0) {
        console.log('Insertion des nouveaux tags:', tags);
        // Récupérer les IDs des tags
        const placeholders = tags.map(() => '?').join(',');
        const [tagRows] = await connection.execute(
          `SELECT id FROM tags WHERE name IN (${placeholders})`,
          tags
        );
        
        if (tagRows.length > 0) {
          const tagValues = tagRows.map(tag => [id, tag.id]);
          await connection.execute(
            'INSERT INTO confession_tags (confession_id, tag_id) VALUES ?',
            [tagValues]
          );
        }
      }
      
      await connection.commit();
      console.log('Mise à jour terminée avec succès');
      return true;
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  static async delete(id) {
    console.log('Suppression de la confession avec l\'ID:', id);
    const connection = await db.getConnection();
    
    try {
      await connection.beginTransaction();
      
      // Supprimer les tags associés
      console.log('Suppression des tags associés...');
      await connection.execute(
        'DELETE FROM confession_tags WHERE confession_id = ?',
        [id]
      );
      
      // Supprimer les réponses associées
      console.log('Suppression des réponses associées...');
      await connection.execute(
        'DELETE FROM responses WHERE confession_id = ?',
        [id]
      );
      
      // Supprimer la confession
      console.log('Suppression de la confession...');
      await connection.execute(
        'DELETE FROM confessions WHERE id = ?',
        [id]
      );
      
      await connection.commit();
      console.log('Suppression terminée avec succès');
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}

module.exports = Confession; 