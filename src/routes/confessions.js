const express = require('express');
const router = express.Router();
const confessionController = require('../controllers/confessionController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Confession:
 *       type: object
 *       required:
 *         - text
 *         - intensity
 *       properties:
 *         id:
 *           type: integer
 *           description: L'identifiant unique de la confession
 *         text:
 *           type: string
 *           description: Le texte de la confession
 *         intensity:
 *           type: integer
 *           minimum: 1
 *           maximum: 10
 *           description: Le niveau d'intensité de la confession (1-10)
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Les tags associés à la confession
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: La date de création de la confession
 */

/**
 * @swagger
 * /api/confessions:
 *   post:
 *     summary: Créer une nouvelle confession
 *     tags: [Confessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *               - intensity
 *             properties:
 *               text:
 *                 type: string
 *               intensity:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 10
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Confession créée avec succès
 *       400:
 *         description: Données invalides
 */
router.post('/', confessionController.createConfession);

/**
 * @swagger
 * /api/confessions:
 *   get:
 *     summary: Récupérer toutes les confessions
 *     tags: [Confessions]
 *     responses:
 *       200:
 *         description: Liste des confessions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Confession'
 */
router.get('/', confessionController.getAllConfessions);

/**
 * @swagger
 * /api/confessions/{id}:
 *   get:
 *     summary: Récupérer une confession par son ID
 *     tags: [Confessions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la confession
 *     responses:
 *       200:
 *         description: Détails de la confession
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Confession'
 *       404:
 *         description: Confession non trouvée
 */
router.get('/:id', confessionController.getConfessionById);

/**
 * @swagger
 * /api/confessions/{id}:
 *   put:
 *     summary: Mettre à jour une confession
 *     tags: [Confessions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la confession
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *               - intensity
 *             properties:
 *               text:
 *                 type: string
 *               intensity:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 10
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Confession mise à jour avec succès
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Confession non trouvée
 */
router.put('/:id', confessionController.updateConfession);

/**
 * @swagger
 * /api/confessions/{id}:
 *   delete:
 *     summary: Supprimer une confession
 *     tags: [Confessions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la confession
 *     responses:
 *       200:
 *         description: Confession supprimée avec succès
 *       404:
 *         description: Confession non trouvée
 */
router.delete('/:id', confessionController.deleteConfession);

module.exports = router; 