const express = require("express");
const router = express.Router();
const {
  ajouterUtilisateur,
  verifierUtilisateur,
  supprimerUtilisateur,
} = require("../api/Utilisateur");
const Utilisateur = require("../models/Utilisateur");

router.post("/ajouter", async (req, res) => {
  const {
    nom_utl,
    pre_ult,
    age_utl,
    num_utl,
    eml_utl,
    adr_utl,
    psd_utl,
    mdp_utl,
  } = req.body;
  try {
    await ajouterUtilisateur(
      nom_utl,
      pre_ult,
      age_utl,
      num_utl,
      eml_utl,
      adr_utl,
      psd_utl,
      mdp_utl,
    );
  } catch (erreur) {
    console.error("Erreur lors de l'ajout de l'utilisateur:", erreur.message);
    res.status(500).json({
      message: "Erreur lors de l'ajout de l'utilisateur",
      erreur: erreur.message,
    });
  }
});

router.post("/verifier", async (req, res) => {
  const { psd_utl, mdp_utl } = req.query;
  try {
    const utilisateur = await verifierUtilisateur(psd_utl, mdp_utl);

    if (utilisateur) {
      console.log("utilisateur trouvé");
      res.json({ message: "Utilisateur trouvé" });
    } else {
      console.log("utilisateur non trouvé");
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (erreur) {
    console.error(
      "Erreur lors de la vérification de l'utilisateur:",
      erreur.message,
    );
    res
      .status(500)
      .json({ message: "Erreur lors de la vérification de l'utilisateur" });
  }
});

router.delete("/supprimer", async (req, res) => {
  const { psd_utl } = req.query;
  try {
    await supprimerUtilisateur(psd_utl);
  } catch (erreur) {
    console.error(
      "Erreur lors de la suppression de l'utilisateur:",
      erreur.message,
    );
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de l'utilisateur" });
  }
});

module.exports = router;
