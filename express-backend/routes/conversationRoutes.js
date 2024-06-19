const express = require("express");
const router = express.Router();

const { ajouterConversation } = require("../api/Conversation");

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

module.exports = router;
