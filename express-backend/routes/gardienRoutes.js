const express = require("express");
const router = express.Router();

const { ajouterGardien} = require("../api/Gardien");

router.post("/ajouter", async (req,res) => {
    const {id_utl} = req.query;
    
        try {
            await ajouterGardien(
                id_utl
                )
        } catch(erreur) {
            console.error("Erreur lors de l'ajout du gardien:", erreur.message);
            res.status(500).json({
              message: "Erreur lors de l'ajout du gardien",
              erreur: erreur.message,
            });
        }
    
})

module.exports = router;