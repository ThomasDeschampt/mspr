const express = require("express");
const router = express.Router();

const { afficherConseillage, ajouterConseillage} = require("../api/Conseiller");


router.get("/afficher", async (req,res) => {
    const { id_cns } = req.query;
    try {
        const messages = await afficherConseillage(id_cns);
        res.json(messages);
    } catch (erreur) {
        console.error("Erreur lors de la récupération du conseillage:", erreur.message);
        res.status(500).json({
          message: "Erreur lors de la récupération du conseillage",
          erreur: erreur.message,
        });
    }
})

router.post("/ajouter", async (req,res) => {
    const {id_cns, id_utl} = req.query;
    
        try {
            await ajouterConseillage(
                id_cns,
                id_utl
                )
        } catch(erreur) {
            console.error("Erreur lors de l'ajout du conseillage:", erreur.message);
            res.status(500).json({
              message: "Erreur lors de l'ajout du conseillage",
              erreur: erreur.message,
            });
        }
    
})

module.exports = router;