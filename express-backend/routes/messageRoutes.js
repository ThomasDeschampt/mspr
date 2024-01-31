const express = require("express");
const router = express.Router();

const { ajouterMessage, afficherMessages} = require("../api/Message");


router.post("/ajouter", async (req,res) => {
    const { dat_msg, txt_msg, id_utl, id_utl_1,} = req.body;
    
        try {
            await ajouterMessage(
                dat_msg,
                txt_msg,
                id_utl,
                id_utl_1
                )
        } catch(erreur) {
            console.error("Erreur lors de l'ajout de l'utilisateur:", erreur.message);
            res.status(500).json({
              message: "Erreur lors de l'ajout de l'utilisateur",
              erreur: erreur.message,
            });
        }
    
})

module.exports = router;