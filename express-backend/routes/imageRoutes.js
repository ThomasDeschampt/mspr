const express = require("express");
const router = express.Router();

const { afficherImage, ajouterImage, afficherImages} = require("../api/Image");


router.get("/afficher", async (req,res) => {
    const { id_img } = req.query;
    try {
        const messages = await afficherImage(id_img);
        res.json(messages);
    } catch (erreur) {
        console.error("Erreur lors de la récupération de l\image:", erreur.message);
        res.status(500).json({
          message: "Erreur lors de la récupération de l\image:",
          erreur: erreur.message,
        });
    }
})

router.get("/afficher_tous", async (req,res) => {
    const { id_utl, id_utl_1, id_plt } = req.query;
    try {
        const messages = await afficherImages(id_utl, id_utl_1, id_plt);
        res.json(messages);
    } catch (erreur) {
        console.error("Erreur lors de la récupération des images du gardiennage:", erreur.message);
        res.status(500).json({
          message: "Erreur lors de la récupération des images du gardiennage:",
          erreur: erreur.message,
        });
    }
})
router.post("/ajouter", async (req,res) => {
    const {url_img, id_utl, id_utl_1, id_plt} = req.query;
    
        try {
            await ajouterImage(
                url_img,
                id_utl,
                id_utl_1,
                id_plt
                )
        } catch(erreur) {
            console.error("Erreur lors de l'ajout de l\'image:", erreur.message);
            res.status(500).json({
              message: "Erreur lors de l'ajout de l\'image:",
              erreur: erreur.message,
            });
        }
    
})

module.exports = router;