const Gardien = require("../models/Gardien");
const Utilisateur = require("../models/Utilisateur");

async function ajouterGardien(psd_utl) {
  const utilisateur = await Utilisateur.findOne({
    where: {
      psd_utl: psd_utl,
    },
  });
  try {
    const id_utl = utilisateur.id_utl;
    const nouveauGardien = await Gardien.create({
      id_utl,
    });
    console.log("Nouveau gardien ajouté:");
  } catch (erreur) {
    console.error("Erreur lors de l'ajout du gardien:", erreur.message);
  }
}

async function verifierGardien(psd_utl) {
  const utilisateur = await Utilisateur.findOne({
    where: {
      psd_utl: psd_utl,
    },
  });

  if(utilisateur){
    const gardien = await Gardien.findOne({
      where: {
        id_utl: utilisateur.id_utl,
      },
    });

    if (gardien) {
      console.log("gardien trouvé");
      return true;
    } else {
      console.log("gardien non trouvé" + utilisateur.id_utl);
      return false;
    }
  } else {
    console.log("utilisateur non trouvé");
    return false;
  }
}

module.exports = { ajouterGardien, verifierGardien };
