const express = require("express");
const router = express.Router();
const { estBotaniste, ajouterBotaniste } = require("../api/Botaniste");
const Botaniste = require("../models/Botaniste");

router.post("/ajouterBotaniste", async (req, res) => {
  const { id_utl } = req.body;

  try {
    await ajouterBotaniste(id_utl);
  } catch (error) {
    console.error("Erreur lors de l'ajout du botaniste", erreur);
  }
});

router.get("/estBotaniste", async (req, res) => {
  const { psd_utl } = req.query;
  try {
    botaniste = await estBotaniste(psd_utl);
    if (botaniste) {
      console.log("botaniste trouvé");
      res.status(200).json({ message: "botaniste trouvé" });
    } else {
      console.log("botaniste non trouvé");
      res.status(404).json({ message: "botaniste non trouvé" });
    }
  } catch (erreur) {
    console.error("Erreur lors de la verification du botaniste:", erreur.message);
    res.status(500).json({
      message: "Erreur lors de la verification du botaniste",
      erreur: erreur.message,
    });
  }
});

module.exports = router;
