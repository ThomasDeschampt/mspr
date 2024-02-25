const Proprietaire = require('../models/Proprietaire');

async function ajouterProprietaire(id_utl) {
  try {
    const nouveauProprietaire = await Proprietaire.create({
      id_utl,
    });
    console.log('Nouveau propriétaire ajouté:', nouveauProprietaire);
  }
  catch (erreur) {
    console.error('Erreur lors de l\'ajout du propriétaire:', erreur.message);
  }
}


module.exports = { ajouterProprietaire };
  
  