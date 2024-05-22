const Utilisateur = require("../models/Utilisateur");
const bcrypt = require('bcrypt');

async function ajouterUtilisateur(
  nom_utl,
  pre_ult,
  age_utl,
  num_utl,
  eml_utl,
  adr_utl,
  psd_utl,
  mdp_utl,
) {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(mdp_utl, saltRounds);

    const nouvelUtilisateur = await Utilisateur.create({
      nom_utl,
      pre_ult,
      age_utl,
      num_utl,
      eml_utl,
      adr_utl,
      psd_utl,
      mdp_utl: hashedPassword,
    });
    console.log("Nouvel utilisateur ajouté:", nouvelUtilisateur);
  } catch (erreur) {
    console.error("Erreur lors de l'ajout de l'utilisateur:", erreur.message);
  }
}


async function verifierUtilisateur(psd_utl, mdp_utl) {
  try {
    const utilisateur = await Utilisateur.findOne({
      where: {
        psd_utl: psd_utl,
      },
    });

    if (!utilisateur) {
      console.log("Utilisateur non trouvé");
      return false;
    }

    // Comparaison du mot de passe fourni avec le mot de passe haché stocké
    const motDePasseValide = await bcrypt.compare(mdp_utl, utilisateur.mdp_utl);

    if (motDePasseValide) {
      console.log("Utilisateur trouvé"); // Imprimez uniquement "Utilisateur trouvé" ici
      return true;
    } else {
      console.log("Mot de passe incorrect");
      return false;
    }
  } catch (erreur) {
    console.error("Erreur lors de la vérification de l'utilisateur:", erreur.message);
  }
}


async function afficherPseudo(id_utl){
  try {
    const utilisateur = await Utilisateur.findOne({
      where: {
        id_utl: id_utl,
      },
    });

    if (utilisateur) {
      console.log("utilisateur trouvé");
      return utilisateur.psd_utl;
    } else {
      console.log("utilisateur non trouvé");
      return false;
    }
  } catch (erreur) {
    console.error(
      "Erreur lors de la vérification de l'utilisateur:",
      erreur.message,
    );
  }
}

async function supprimerUtilisateur(psd_utl) {
  try {
    const utilisateur = await Utilisateur.findOne({
      where: {
        psd_utl: psd_utl,
      },
    });

    if (utilisateur) {
      await utilisateur.destroy();
      console.log("utilisateur supprimé");
      return true;
    } else {
      console.log("utilisateur non trouvé");
      return false;
    }
  } catch (erreur) {
    console.error(
      "Erreur lors de la suppression de l'utilisateur:",
      erreur.message,
    );
  }
}

module.exports = {
  ajouterUtilisateur,
  verifierUtilisateur,
  supprimerUtilisateur,
  afficherPseudo
};
