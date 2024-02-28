const express = require("express");
const router = express.Router();

const { ajouterGardien, verifierGardien } = require("../api/Gardien");

router.post("/ajouter", async (req, res) => {
  const { id_utl } = req.query;

  try {
    await ajouterGardien(id_utl);
  } catch (erreur) {
    console.error("Erreur lors de l'ajout du gardien:", erreur.message);
    res.status(500).json({
      message: "Erreur lors de l'ajout du gardien",
      erreur: erreur.message,
    });
  }
});

router.get("/estGardien", async (req, res) => {
  const { psd_utl } = req.query;

  try {
    gardien = await verifierGardien(id_utl);
    if (gardien) {
      console.log("gardien trouvé");
      res.status(200).json({ message: "gardien trouvé" });
    } else {
      console.log("gardien non trouvé");
      res.status(404).json({ message: "gardien non trouvé" });
    }
  } catch (erreur) {
    console.error("Erreur lors de la vérification du gardien:", erreur.message);
    res.status(500).json({
      message: "Erreur lors de la vérification du gardien",
      erreur: erreur.message,
    });
  }
});

module.exports = router;
