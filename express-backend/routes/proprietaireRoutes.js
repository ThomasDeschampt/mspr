const express = require("express");
const router = express.Router();

const { ajouterProprietaire } = require("../api/Proprietaire");

router.post("/ajouter", async (req, res) => {
  const { id_utl } = req.query;

  try {
    await ajouterProprietaire(id_utl);
  } catch (erreur) {
    console.error("Erreur lors de l'ajout du proprietaire:", erreur.message);
    res.status(500).json({
      message: "Erreur lors de l'ajout du proprietaire",
      erreur: erreur.message,
    });
  }
});

router.get("/verifier", async (req, res) => {
  const { id_utl } = req.query;

  try {
    await verifierProprietaire(id_utl);
  } catch (erreur) {
    console.error("Erreur lors de la vérification du proprietaire:", erreur.message);
    res.status(500).json({
      message: "Erreur lors de la vérification du proprietaire",
      erreur: erreur.message,
    });
  }
});

module.exports = router;
