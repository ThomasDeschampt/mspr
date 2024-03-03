const express = require("express");
const router = express.Router();

const { ajouterConseil, afficherConseil } = require("../api/Conseil");

router.post("/ajouter", async (req, res) => {
  const { dsc_csn, id_plt, psd_utl } = req.query;

  try {
    await ajouterConseil(dsc_csn, id_plt, psd_utl);
  } catch (erreur) {
    console.error("Erreur lors de l'ajout du conseil:", erreur.message);
    res.status(500).json({
      message: "Erreur lors de l'ajout du conseil",
      erreur: erreur.message,
    });
  }
});

router.get("/afficher", async (req, res) => {
  const { id_cns } = req.query;
  try {
    const messages = await afficherConseil(id_cns);
    res.json(messages);
  } catch (erreur) {
    console.error("Erreur lors de la récupération du conseil:", erreur.message);
    res.status(500).json({
      message: "Erreur lors de la récupération du conseil",
      erreur: erreur.message,
    });
  }
});

module.exports = router;
