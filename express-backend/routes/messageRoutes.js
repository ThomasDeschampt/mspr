const express = require("express");
const router = express.Router();

const { ajouterMessage, afficherMessages } = require("../api/Message");

router.post("/ajouter", async (req, res) => {
  const { id_conv, dat_msg, txt_msg, id_sender } = req.query;

  try {
    await ajouterMessage(id_conv, dat_msg, txt_msg, id_sender);
  } catch (erreur) {
    console.error("Erreur lors de l'ajout du message:", erreur.message);
    res.status(500).json({
      message: "Erreur lors de l'ajout du message",
      erreur: erreur.message,
    });
  }
});

router.get("/afficher", async (req, res) => {
  const { id_conv } = req.query;
  try {
    const messages = await afficherMessages(id_conv);
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

module.exports = router;
