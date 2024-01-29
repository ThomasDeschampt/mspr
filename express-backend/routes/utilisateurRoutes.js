const express = require('express');
const router = express.Router();
const Utilisateur = require('../models/Utilisateur');

// Route pour l'ajout d'un utilisateur
app.post('/utilisateurs', async (req, res) => {
    try {
        // Extraire les données de la requête
        const { nom_utl, pre_ult, age_utl, num_utl, eml_utl, adr_utl, psd_utl, mdp_utl } = req.body;

        // Créer un nouvel utilisateur dans la base de données
        const nouvelUtilisateur = await Utilisateur.create({
            nom_utl,
            pre_ult,
            age_utl,
            num_utl,
            eml_utl,
            adr_utl,
            psd_utl,
            mdp_utl
        });

        // Répondre avec l'utilisateur nouvellement créé
        res.status(201).json(nouvelUtilisateur);
    } catch (error) {
        // Gérer les erreurs
        console.error('Erreur lors de la création de l\'utilisateur :', error);
        res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur' });
    }
});


router.post('/verifier', async (req, res) => {
    const { pseudo, motdepasse } = req.body;
    try {
        const utilisateur = await Utilisateur.findOne({
            where: {
                psd_utl: pseudo,
                mdp_utl: motdepasse,
            },
        });
        if (utilisateur) {
            console.log("utilisateur trouvé");
            res.json({ message: 'Utilisateur trouvé' });
        } else {
            console.log("utilisateur non trouvé");
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    } catch (erreur) {
        console.error('Erreur lors de la vérification de l\'utilisateur:', erreur.message);
        res.status(500).json({ message: 'Erreur lors de la vérification de l\'utilisateur' });
    }
});

// Route pour la suppression d'un utilisateur
router.delete('/supprimer/:pseudo', async (req, res) => {
    const pseudo = req.params.pseudo;
    try {
        const utilisateur = await Utilisateur.findOne({
            where: {
                psd_utl: pseudo,
            },
        });
        if (utilisateur) {
            await utilisateur.destroy();
            res.json({ message: 'Utilisateur supprimé avec succès' });
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    } catch (erreur) {
        console.error('Erreur lors de la suppression de l\'utilisateur:', erreur.message);
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur' });
    }
});

module.exports = router;
