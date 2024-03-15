const express = require("express");
const router = express.Router();
const {
  ajouterUtilisateur,
  verifierUtilisateur,
  supprimerUtilisateur,
  afficherPseudo
} = require("../api/Utilisateur");
const Utilisateur = require("../models/Utilisateur");
const jwt = require('jsonwebtoken');



const JWT_SECRET = 'yhYS/U54kbwriU1CNGETOJnsmDNdCPJy2MUbM8GLVik=';


function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.error("Erreur de vérification du token JWT :", err);
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

router.post("/ajouter", async (req, res) => {
  // Vérifiez les paramètres fournis dans la requête POST
  const { nom_utl, pre_ult, age_utl, num_utl, eml_utl, adr_utl, psd_utl, mdp_utl } = req.body;
  if (!nom_utl || !pre_ult || !age_utl || !num_utl || !eml_utl || !adr_utl || !psd_utl || !mdp_utl) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  try {
    await ajouterUtilisateur(nom_utl, pre_ult, age_utl, num_utl, eml_utl, adr_utl, psd_utl, mdp_utl);
    res.status(200).json({ message: "Utilisateur ajouté avec succès" });
  } catch (erreur) {
    console.error("Erreur lors de l'ajout de l'utilisateur :", erreur.message);
    res.status(500).json({ message: "Erreur lors de l'ajout de l'utilisateur", erreur: erreur.message });
  }
});

router.post("/verifier", async (req, res) => {
  const { psd_utl, mdp_utl } = req.body;
  if (!psd_utl || !mdp_utl) {
    return res.status(400).json({ message: "Nom d'utilisateur et mot de passe requis" });
  }

  try {
    const utilisateur = await verifierUtilisateur(psd_utl, mdp_utl);

    if (utilisateur) {
      const token = jwt.sign({ psd_utl }, JWT_SECRET);
      console.log("Token JWT généré :", token);
      res.json({ token });
    } else {
      res.status(401).json({ message: "Identifiants incorrects" });
    }
  } catch (erreur) {
    console.error("Erreur lors de la vérification de l'utilisateur :", erreur.message);
    res.status(500).json({ message: "Erreur lors de la vérification de l'utilisateur", erreur: erreur.message });
  }
});

router.delete("/supprimer", authenticateToken, async (req, res) => {
  const { psd_utl } = req.query;
  if (!psd_utl) {
    return res.status(400).json({ message: "Le nom d'utilisateur est requis" });
  }

  try {
    await supprimerUtilisateur(psd_utl);
    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (erreur) {
    console.error("Erreur lors de la suppression de l'utilisateur :", erreur.message);
    res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur", erreur: erreur.message });
  }
});

router.get("/pseudo", async (req, res) => {
  const { id_utl } = req.query;
  if (!id_utl) {
    return res.status(400).json({ message: "L'ID utilisateur est requis" });
  }

  try {
    const utilisateur = await afficherPseudo(id_utl);
    res.status(200).json({ utilisateur });
  } catch (erreur) {
    console.error("Erreur lors de la récupération du pseudo de l'utilisateur :", erreur.message);
    res.status(500).json({ message: "Erreur lors de la récupération du pseudo de l'utilisateur", erreur: erreur.message });
  }
});

module.exports = router;