const Gardien = require("../models/Gardien");

async function ajouterGardien(id_utl) {
  try {
    const nouveauGardien = await Gardien.create({
      id_utl,
    });
    console.log("Nouveau gardien ajouté:", nouveauGardien.toJSON());
  } catch (erreur) {
    console.error("Erreur lors de l'ajout du gardien:", erreur.message);
  }
}

async function verifierGardien(id_utl) {
  try {
    const gardien = await Gardien.findOne({
      where: {
        id_utl,
      },
    });
    if (gardien) {
      return true;
    }else{
      return false;
    }
  } catch (erreur) {
    console.error("Erreur lors de la vérification du gardien:", erreur.message);
  }
}

module.exports = { ajouterGardien, verifierGardien };
