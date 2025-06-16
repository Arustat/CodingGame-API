const express = require('express');
const router = express.Router();
const db = require('../config/database');

/**
 * @swagger
 * /api/tags:
 *   get:
 *     summary: Récupérer tous les tags disponibles
 *     tags: [Tags]
 *     responses:
 *       200:
 *         description: Liste des tags
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT DISTINCT tag FROM confession_tags ORDER BY tag');
    const tags = rows.map(row => row.tag);
    
    res.json({
      success: true,
      data: tags
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des tags:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des tags'
    });
  }
});

module.exports = router; 