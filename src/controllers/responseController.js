const Response = require('../models/response');

exports.createResponse = async (req, res) => {
  try {
    const { confession_id, text, is_psychologist } = req.body;

    // Validation
    if (!confession_id || !text) {
      return res.status(400).json({
        success: false,
        message: 'L\'ID de la confession et le texte sont requis'
      });
    }

    const responseId = await Response.create({
      confession_id,
      text,
      is_psychologist: is_psychologist || false
    });
    
    res.status(201).json({
      success: true,
      message: 'Réponse créée avec succès',
      data: { id: responseId }
    });
  } catch (error) {
    console.error('Erreur lors de la création de la réponse:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création de la réponse'
    });
  }
};

exports.getResponsesByConfessionId = async (req, res) => {
  try {
    const responses = await Response.findByConfessionId(req.params.confessionId);
    
    res.json({
      success: true,
      data: responses
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des réponses:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des réponses'
    });
  }
};

exports.updateResponse = async (req, res) => {
  try {
    const { text } = req.body;
    const responseId = req.params.id;

    // Validation
    if (!text) {
      return res.status(400).json({
        success: false,
        message: 'Le texte est requis'
      });
    }

    const success = await Response.update(responseId, { text });
    
    if (!success) {
      return res.status(404).json({
        success: false,
        message: 'Réponse non trouvée'
      });
    }
    
    res.json({
      success: true,
      message: 'Réponse mise à jour avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la réponse:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour de la réponse'
    });
  }
};

exports.deleteResponse = async (req, res) => {
  try {
    const success = await Response.delete(req.params.id);
    
    if (!success) {
      return res.status(404).json({
        success: false,
        message: 'Réponse non trouvée'
      });
    }
    
    res.json({
      success: true,
      message: 'Réponse supprimée avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la suppression de la réponse:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression de la réponse'
    });
  }
}; 