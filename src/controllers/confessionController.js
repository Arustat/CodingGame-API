const Confession = require('../models/confession');

exports.createConfession = async (req, res) => {
  try {
    const { text, intensity, tags } = req.body;
    console.log('Données reçues:', { text, intensity, tags });

    // Validation
    if (!text || !intensity) {
      return res.status(400).json({
        success: false,
        message: 'Le texte et l\'intensité sont requis'
      });
    }

    if (intensity < 1 || intensity > 10) {
      return res.status(400).json({
        success: false,
        message: 'L\'intensité doit être comprise entre 1 et 10'
      });
    }

    console.log('Tentative de création de la confession...');
    const confessionId = await Confession.create({ text, intensity, tags });
    console.log('Confession créée avec l\'ID:', confessionId);
    
    res.status(201).json({
      success: true,
      message: 'Confession créée avec succès',
      data: { id: confessionId }
    });
  } catch (error) {
    console.error('Erreur détaillée lors de la création de la confession:', {
      message: error.message,
      code: error.code,
      errno: error.errno,
      sqlMessage: error.sqlMessage,
      sqlState: error.sqlState,
      stack: error.stack
    });
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création de la confession',
      error: process.env.NODE_ENV === 'development' ? {
        message: error.message,
        code: error.code,
        sqlMessage: error.sqlMessage
      } : undefined
    });
  }
};

exports.getAllConfessions = async (req, res) => {
  try {
    const confessions = await Confession.findAll();
    
    res.json({
      success: true,
      data: confessions
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des confessions:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des confessions'
    });
  }
};

exports.getConfessionById = async (req, res) => {
  try {
    const confession = await Confession.findById(req.params.id);
    
    if (!confession) {
      return res.status(404).json({
        success: false,
        message: 'Confession non trouvée'
      });
    }
    
    res.json({
      success: true,
      data: confession
    });
  } catch (error) {
    console.error('Erreur lors de la récupération de la confession:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de la confession'
    });
  }
};

exports.updateConfession = async (req, res) => {
  try {
    const { text, intensity, tags } = req.body;
    const confessionId = req.params.id;

    // Validation
    if (!text || !intensity) {
      return res.status(400).json({
        success: false,
        message: 'Le texte et l\'intensité sont requis'
      });
    }

    if (intensity < 1 || intensity > 10) {
      return res.status(400).json({
        success: false,
        message: 'L\'intensité doit être comprise entre 1 et 10'
      });
    }

    const success = await Confession.update(confessionId, { text, intensity, tags });
    
    if (!success) {
      return res.status(404).json({
        success: false,
        message: 'Confession non trouvée'
      });
    }
    
    res.json({
      success: true,
      message: 'Confession mise à jour avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la confession:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour de la confession'
    });
  }
};

exports.deleteConfession = async (req, res) => {
  try {
    const success = await Confession.delete(req.params.id);
    
    if (!success) {
      return res.status(404).json({
        success: false,
        message: 'Confession non trouvée'
      });
    }
    
    res.json({
      success: true,
      message: 'Confession supprimée avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la suppression de la confession:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression de la confession'
    });
  }
}; 