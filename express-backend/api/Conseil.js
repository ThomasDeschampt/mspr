const Conseil = require("../models/Conseil");
const Utilisateur = require("../models/Utilisateur");

async function ajouterConseil(dsc_csn, id_plt, psd_utl) {
  const proprietaire = await Utilisateur.findOne({
    where: {
      psd_utl: psd_utl,
    },
  });

  const id_utl = proprietaire.id_utl;

  try {
    const nouveauConseil = await Conseil.create({
      dsc_csn: dsc_csn,
      id_plt: id_plt,
      id_utl: id_utl,
    });
    console.log("Nouveau conseil ajouté:", nouveauConseil.toJSON());
    return nouveauConseil;
  } catch (erreur) {
    console.error("Erreur lors de l'ajout du conseil:", erreur.message);
    throw erreur;
  }
}

async function afficherConseil(id_cns) {
  try {
    const conseil = await Conseil.findOne({
      where: {
        id_cns: id_cns,
      },
    });
    return conseil;
  } catch (erreur) {
    console.error("Erreur lors de la récupération du conseil:", erreur.message);
  }
}

module.exports = { ajouterConseil, afficherConseil };
