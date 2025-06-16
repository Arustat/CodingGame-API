const db = require('../config/database');

class Response {
  static async create(responseData) {
    const { confession_id, text, is_psychologist } = responseData;
    const [result] = await db.execute(
      'INSERT INTO responses (confession_id, text, is_psychologist, created_at) VALUES (?, ?, ?, NOW())',
      [confession_id, text, is_psychologist]
    );
    return result.insertId;
  }

  static async findByConfessionId(confessionId) {
    const [rows] = await db.execute(
      'SELECT * FROM responses WHERE confession_id = ? ORDER BY created_at DESC',
      [confessionId]
    );
    return rows;
  }

  static async update(id, responseData) {
    const { text } = responseData;
    const [result] = await db.execute(
      'UPDATE responses SET text = ? WHERE id = ?',
      [text, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await db.execute(
      'DELETE FROM responses WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }
}

module.exports = Response; 