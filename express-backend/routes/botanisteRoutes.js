const express = require("express");
const router = express.Router();
const {
  estBotaniste,
  ajouterBotaniste
} = require("../api/Botaniste");
const Botaniste = require("../models/Botaniste");

router.post("/ajouterBotaniste", async (req,res) => {
    const { id_utl } = req.body;

    try {
        await ajouterBotaniste(id_utl)
    } catch (error) {
        console.error("Erreur lors de l'ajout du botaniste", erreur);
    }
})

router.post("/estBotaniste", async (req, res) => {
  const {psd_utl} = req.query;
  try {
    await estBotaniste( 
      psd_utl,
    );
  } catch (erreur) {
    console.error("Erreur lors de l'ajout de l'Botaniste:", erreur.message);
    res.status(500).json({
      message: "Erreur lors de l'ajout de l'Botaniste",
      erreur: erreur.message,
    });
  }
});


module.exports = router;
