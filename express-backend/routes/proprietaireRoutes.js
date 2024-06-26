const express = require("express");
const router = express.Router();

const { ajouterProprietaire, verifierProprietaire } = require("../api/Proprietaire");

router.post("/ajouter", async (req, res) => {
  const { psd_utl } = req.query;

  try {
    await ajouterProprietaire(psd_utl);
  } catch (erreur) {
    console.error("Erreur lors de l'ajout du proprietaire:", erreur.message);
    res.status(500).json({
      message: "Erreur lors de l'ajout du proprietaire",
      erreur: erreur.message,
    });
  }
});

router.get("/estProprietaire", async (req, res) => {
  const { psd_utl } = req.query;
  try {
    proprio = await verifierProprietaire(psd_utl);
    if (proprio) {
      console.log("proprietaire trouvé");
      res.status(200).json({ message: "proprietaire trouvé" });
    } else {
      console.log("proprietaire non trouvé");
      res.status(404).json({ message: "proprietaire non trouvé" });
    }
  } catch (erreur) {
    console.error("Erreur lors de la vérification du proprietaire:", erreur.message);
    res.status(500).json({
      message: "Erreur lors de la vérification du proprietaire",
      erreur: erreur.message,
    });
  }
});

module.exports = router;
