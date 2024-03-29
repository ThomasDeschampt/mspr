const express = require("express");
const router = express.Router();

const { ajouterMessage, afficherMessages } = require("../api/Message");

router.post("/ajouter", async (req, res) => {
  const { txt_msg, id_utl, id_utl_1 } = req.query;

  try {
    await ajouterMessage(txt_msg, id_utl, id_utl_1);
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

module.exports = router;
