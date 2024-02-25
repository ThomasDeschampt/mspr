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

module.exports = { ajouterGardien };
