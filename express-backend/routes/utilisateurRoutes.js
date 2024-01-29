const express = require('express');
const router = express.Router();
const Utilisateur = require('../models/Utilisateur');

// Route pour l'ajout d'un utilisateur
router.post('/ajouter', async (req, res) => {
    const { nom, prenom, age, numero, email, adresse, pseudo, motdepasse } = req.body;
    try {
        const nouvelUtilisateur = await Utilisateur.create({
            nom_utl: nom,
            pre_ult: prenom,
            age_utl: age,
            num_utl: numero,
            eml_utl: email,
            adr_utl: adresse,
            psd_utl: pseudo,
            mdp_utl: motdepasse,
        });
        console.log('Nouvel utilisateur ajouté:', nouvelUtilisateur.toJSON());
        res.json({ message: 'Utilisateur ajouté avec succès' });
    } catch (erreur) {
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', erreur.message);
        res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'utilisateur' });
    }
});

// Route pour la vérification d'un utilisateur
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
