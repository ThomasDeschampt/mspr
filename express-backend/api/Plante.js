const Plante = require("../models/Plante");
const Utilisateur = require("../models/Utilisateur");

async function afficherPlante(adr_plt) {
  try {
    const plante = await Plante.findOne({
      where: {
        adr_plt: adr_plt,
      },
    });
    return plante;
  } catch (erreur) {
    console.error(
      "Erreur lors de la récupération de la plante:",
      erreur.message,
    );
  }
}

async function afficherPlanteGardees(id_utl_1) {
  try {
    const plantes = await Plante.findAll({
      where: {
        id_utl_1: id_utl_1,
      },
    });
    return plantes;
  } catch (erreur) {
    console.error(
      "Erreur lors de la récupération des plantes gardees:",
      erreur.message,
    );
  }
}

async function afficherPlanteFaitesGardees(id_utl) {
  try {
    const plantes = await Plante.findAll({
      where: {
        id_utl: id_utl,
      },
    });
    return plantes;
  } catch (erreur) {
    console.error(
      "Erreur lors de la récupération des plantes faites gardees:",
      erreur.message,
    );
  }
}

async function recupererlocalisation() {
  try {
    const plantes = await Plante.findAll({
      where: {
        id_utl_1: 1,
      },
    });
    let localisation = [];
    for (let i = 0; i < plantes.length; i++) {
      localisation.push(plantes[i].adr_plt);
    }
    return localisation;
  } catch (erreur) {
    console.error(
      "Erreur lors de la récupération de la localisation de la plante:",
      erreur.message,
    );
  }
}

async function ajouterPlante(
  esp_plt,
  des_plt,
  nom_plt,
  adr_plt,
  dat_deb_plt,
  dat_fin_plt,
  psd_utl,
) {
  const proprietaire = await Utilisateur.findOne({
    where: {
      psd_utl: psd_utl,
    },
  });
  try {
    const plante = await Plante.create({
      esp_plt: esp_plt,
      dsc_plt: des_plt,
      nom_plt: nom_plt,
      adr_plt: adr_plt,
      dat_deb_plt: dat_deb_plt,
      dat_fin_plt: dat_fin_plt,
      id_utl: proprietaire.id_utl,
      id_utl_1: 1,
    });
    console.log("Nouvelle plante ajoutée:", plante);
    return plante;
  } catch (erreur) {
    console.error("Erreur lors de l'ajout de la plante:", erreur.message);
  }
}

async function ajouterGardienPlante(id_plt, id_utl_1) {
  try {
    const plante = await Plante.update(
      {
        id_utl_1: id_utl_1,
      },
      {
        where: {
          id_plt: id_plt,
        },
      },
    );
    console.log("Gardien ajouté à la plante");
  } catch (erreur) {
    console.error(
      "Erreur lors de l'ajout du gardien à la plante:",
      erreur.message,
    );
  }
}

module.exports = {
  afficherPlante,
  afficherPlanteFaitesGardees,
  afficherPlanteGardees,
  recupererlocalisation,
  ajouterPlante,
  ajouterGardienPlante,
};
