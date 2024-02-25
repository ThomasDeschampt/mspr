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
    throw erreur;
  }
}

async function ajouterConseillage(id_cns, id_utl) {
  try {
    const conseillage = await Conseiller.create({
      id_cns: id_cns,
      id_utl: id_utl,
    });
  } catch (erreur) {
    console.error('Erreur lors de l\'ajout du conseillage');
  }
}

module.exports = { afficherConseillage, ajouterConseillage };