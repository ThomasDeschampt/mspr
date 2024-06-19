const express = require("express");
const router = express.Router();

const { ajouterConversation, afficherConversations } = require("../api/Conversation");

router.post("/ajouter", async (req, res) => {
  const { id_plt, id_utl1, id_utl2, type } = req.query;

  try {
    await ajouterConversation(id_plt, id_utl1, id_utl2, type);
  } catch (erreur) {
    console.error("Erreur lors de l'ajout de la conversation:", erreur.message);
    res.status(500).json({
      message: "Erreur lors de l'ajout de la conversation",
      erreur: erreur.message,
    });
  }
});

router.get("/afficher", async (req, res) => {
  const { id_utl } = req.query;
  try {
    const conversations = await afficherConversations(id_utl);
    res.status(200).json(conversations);
  } catch (erreur) {
    console.error("Erreur lors de la récupération des conversations:", erreur.message);
    res.status(500).json({
      message: "Erreur lors de la récupération des conversations",
      erreur: erreur.message,
    });
  }
});

module.exports = router;
