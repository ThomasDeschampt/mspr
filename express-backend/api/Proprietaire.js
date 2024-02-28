const Proprietaire = require("../models/Proprietaire");
const Utilisateur = require("../models/Utilisateur");

async function ajouterProprietaire(id_utl) {
  try {
    const nouveauProprietaire = await Proprietaire.create({
      id_utl,
    });
    console.log("Nouveau propriétaire ajouté:", nouveauProprietaire);
  } catch (erreur) {
    console.error("Erreur lors de l'ajout du propriétaire:", erreur.message);
  }
}

async function verifierProprietaire(psd_utl) {
  const utilisateur = await Utilisateur.findOne({
    where: {
      psd_utl: psd_utl,
    },
  });

  if(utilisateur){
    const proprietaire = await Proprietaire.findOne({
      where: {
        id_utl: utilisateur.id_utl,
      },
    });

    if (proprietaire) {
      console.log("proprietaire trouvé");
      return true;
    } else {
      console.log("proprietaire non trouvé" + utilisateur.id_utl);
      return false;
    }
  } else {
    console.log("utilisateur non trouvé");
    return false;
  }
}

module.exports = { ajouterProprietaire, verifierProprietaire };
