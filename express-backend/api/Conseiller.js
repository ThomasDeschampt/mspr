const Conseiller = require('../models/Conseiller');


async function afficherConseillage(id_cns) {
  try {
    const conseillage = await Conseiller.findOne({
      where: {
        id_cns: id_cns,
      }
    });
    return conseillage;
  } catch (erreur) {
    console.error('Erreur lors de la récupération du conseillage:', erreur.message);
  }
}

async function ajouterConseillage(id_cns, id_utl) {
  try {
    const conseillage = await Conseiller.create({
      id_cns: id_cns,
      id_utl: id_utl,
    });
    console.log('Nouveau conseillage ajouté:', nouveauConseil.toJSON());
  } catch (erreur) {
    console.error('Erreur lors de l\'ajout du conseillage:', erreur.message);
  }
}

module.exports = { afficherConseillage, ajouterConseillage };