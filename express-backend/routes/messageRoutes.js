const express = require("express");
const router = express.Router();

const { ajouterMessage, afficherMessages, afficherConversations } = require("../api/Message");

router.post("/ajouter", async (req, res) => {
  const { txt_msg, exp_msg, id_utl, id_utl_1 } = req.query;

  try {
    await ajouterMessage(txt_msg, exp_msg, id_utl, id_utl_1);
  } catch (erreur) {
    console.error("Erreur lors de l'ajout de l'utilisateur:", erreur.message);
    res.status(500).json({
      message: "Erreur lors de l'ajout de l'utilisateur",
      erreur: erreur.message,
    });
  }
});

router.get("/afficher", async (req, res) => {
  const { id_utl, id_utl_1 } = req.query;
  try {
    const messages = await afficherMessages(id_utl, id_utl_1);
    res.json(messages);
  } catch (erreur) {
    console.error(
      "Erreur lors de la récupération des messages:",
      erreur.message,
    );
    res.status(500).json({
      message: "Erreur lors de la récupération des messages",
      erreur: erreur.message,
    });
  }
});

router.get("/conversations", async (req, res) => {
  const { psd_utl } = req.query;
  try {
    const conversations = await afficherConversations(psd_utl);
    res.json(conversations);
  } catch (erreur) {
    console.error(
      "Erreur lors de la récupération des conversations:",
      erreur.message,
    );
    res.status(500).json({
      message: "Erreur lors de la récupération des conversations",
      erreur: erreur.message,
    });
  }
});

module.exports = router;
