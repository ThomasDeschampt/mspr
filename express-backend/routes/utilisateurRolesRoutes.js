const express = require('express');
const router = express.Router();
const { ajouterRole } = require('../api/UtilisateurRoles'); 

router.post('/ajouter', async (req, res) => {
  const { role_name } = req.body;
  try {
    const newRole = await ajouterRole(role_name);
    res.status(201).json(newRole);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
