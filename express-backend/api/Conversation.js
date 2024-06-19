const Conversation = require("../models/Conversation");
const { Op } = require('sequelize');

async function ajouterConversation(id_plt, id_utl1, id_utl2, type) {
  try {
    const nouvelleconv = await Conversation.create({
      id_plt: id_plt,
      id_utl1: id_utl1,
      id_utl2: id_utl2,
      type: type
    });
    res.status(200).json({
      message: "Conversation ajoutée",
    });
    console.log("Nouvelle conversation ajoutéeeee:", nouvelleconv);
  } catch (erreur) {
    console.error("Erreur lors de l'ajout de la conversation:", erreur.message);
    res.status(500).json({
      message: "Erreur lors de l'ajout de la conversation",
      erreur: erreur.message,
    });
  }
}

async function afficherConversations(id_utl) {
  try {
    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: [{id_utl1: id_utl}, {id_utl2: id_utl}]
      }
    });
    console.log("conversations trouvées");
    return conversations;
  } catch (erreur) {
    console.error("Erreur lors de la récupération des conversations:", erreur.message);
    throw erreur;
  }
}



module.exports = { ajouterConversation, afficherConversations };
