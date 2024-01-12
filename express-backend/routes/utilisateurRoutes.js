// src/routes/utilisateurRoutes.js

const express = require('express');
const utilisateurController = require('../controllers/utilisateurController');
const router = express.Router();

// Route pour l'inscription d'un utilisateur
router.post('/inscription', utilisateurController.inscrireUtilisateur);

// Ajoutez d'autres routes liées aux utilisateurs au besoin

module.exports = router;
