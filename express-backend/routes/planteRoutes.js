const express = require("express");
const router = express.Router();

const {
  afficherPlante,
  afficherPlanteFaitesGardees,
  afficherPlanteGardees,
  recupererlocalisation,
  ajouterPlante,
  ajouterGardienPlante,
} = require("../api/Plante");

router.get("/afficher", async (req, res) => {
  const { adr_plt } = req.query;
  try {
    const messages = await afficherPlante(adr_plt);
    res.json(messages);
  } catch (erreur) {
    console.error(
      "Erreur lors de la récupération de la plante:",
      erreur.message,
    );
    res.status(500).json({
      message: "Erreur lors de la récupération de la plante:",
      erreur: erreur.message,
    });
  }
});

router.get("/afficherGardees", async (req, res) => {
  const { id_utl_1 } = req.query;
  try {
    const messages = await afficherPlanteGardees(id_utl_1);
    res.json(messages);
  } catch (erreur) {
    console.error(
      "Erreur lors de la récupération des plantes gardees:",
      erreur.message,
    );
    res.status(500).json({
      message: "Erreur lors de la récupération des plantes gardees:",
      erreur: erreur.message,
    });
  }
});

router.get("/afficherFaitesGardees", async (req, res) => {
  const { psd_utl } = req.query;
  try {
    const messages = await afficherPlanteFaitesGardees(psd_utl);
    res.json(messages);
  } catch (erreur) {
    console.error(
      "Erreur lors de la récupération des plantes faites gardees:",
      erreur.message,
    );
    res.status(500).json({
      message: "Erreur lors de la récupération des plantes faites gardees:",
      erreur: erreur.message,
    });
  }
});

router.get("/recupererlocalisation", async (req, res) => {
  try {
    const messages = await recupererlocalisation();
    res.json(messages);
  } catch (erreur) {
    console.error(
      "Erreur lors de la récupération de la localisation de la plante:",
      erreur.message,
    );
    res.status(500).json({
      message:
        "Erreur lors de la récupération de la localisation de la plante:",
      erreur: erreur.message,
    });
  }
});

router.post("/ajouter", async (req, res) => {
  const {
    esp_plt,
    des_plt,
    nom_plt,
    adr_plt,
    dat_deb_plt,
    dat_fin_plt,
    psd_utl,
  } = req.query;
  try {
    const messages = await ajouterPlante(
      esp_plt,
      des_plt,
      nom_plt,
      adr_plt,
      dat_deb_plt,
      dat_fin_plt,
      psd_utl,
    );
    res.json(messages);
  } catch (erreur) {
    console.error("Erreur lors de l'ajout de la plante:", erreur.message);
    res.status(500).json({
      message: "Erreur lors de l'ajout de la plante:",
      erreur: erreur.message,
    });
  }
});

router.post("/ajouterGardien", async (req, res) => {
  const { id_plt, id_utl_1 } = req.body;
  try {
    const messages = await ajouterGardienPlante(id_plt, id_utl_1);
    res.json(messages);
  } catch (erreur) {
    console.error("Erreur lors de l'ajout du gardien:", erreur.message);
    res.status(500).json({
      message: "Erreur lors de l'ajout du gardien:",
      erreur: erreur.message,
    });
  }
});

module.exports = router;
