const Utilisateur = require("../models/Utilisateur");
const Botaniste = require("../models/Botaniste");

async function ajouterBotaniste(id_utl) {
  await Botaniste.create({
    id_utl,
  });
}

async function estBotaniste(psd_utl) {
  const utilisateur = await Utilisateur.findOne({
    where: {
      psd_utl: psd_utl,
    },
  });

  if (utilisateur) {
    const botaniste = await Botaniste.findOne({
      where: {
        id_utl: utilisateur.id_utl,
      },
    });

    if (botaniste) {
      console.log("botaniste trouvé");
      return true;
    } else {
      console.log("botaniste non trouvé" + utilisateur.id_utl);
      return false;
    }
  } else {
    console.log("utilisateur non trouvé");
    return false;
  }
}

module.exports = { ajouterBotaniste, estBotaniste };
