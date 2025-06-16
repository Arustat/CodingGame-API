const express = require('express');
const router = express.Router();
const responseController = require('../controllers/responseController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Response:
 *       type: object
 *       required:
 *         - confession_id
 *         - text
 *       properties:
 *         id:
 *           type: integer
 *           description: L'identifiant unique de la réponse
 *         confession_id:
 *           type: integer
 *           description: L'ID de la confession associée
 *         text:
 *           type: string
 *           description: Le texte de la réponse
 *         is_psychologist:
 *           type: boolean
 *           description: Indique si la réponse provient d'un psy fictif
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: La date de création de la réponse
 */

/**
 * @swagger
 * /api/responses:
 *   post:
 *     summary: Créer une nouvelle réponse
 *     tags: [Réponses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - confession_id
 *               - text
 *             properties:
 *               confession_id:
 *                 type: integer
 *               text:
 *                 type: string
 *               is_psychologist:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Réponse créée avec succès
 *       400:
 *         description: Données invalides
 */
router.post('/', responseController.createResponse);

/**
 * @swagger
 * /api/responses/confession/{confessionId}:
 *   get:
 *     summary: Récupérer toutes les réponses d'une confession
 *     tags: [Réponses]
 *     parameters:
 *       - in: path
 *         name: confessionId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la confession
 *     responses:
 *       200:
 *         description: Liste des réponses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Response'
 */
router.get('/confession/:confessionId', responseController.getResponsesByConfessionId);

/**
 * @swagger
 * /api/responses/{id}:
 *   put:
 *     summary: Mettre à jour une réponse
 *     tags: [Réponses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la réponse
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Réponse mise à jour avec succès
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Réponse non trouvée
 */
router.put('/:id', responseController.updateResponse);

/**
 * @swagger
 * /api/responses/{id}:
 *   delete:
 *     summary: Supprimer une réponse
 *     tags: [Réponses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la réponse
 *     responses:
 *       200:
 *         description: Réponse supprimée avec succès
 *       404:
 *         description: Réponse non trouvée
 */
router.delete('/:id', responseController.deleteResponse);

module.exports = router; 