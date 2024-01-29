const Utilisateur = require('../models/Utilisateur');
const botaniste = require('../models/Botaniste');

async function ajouterUtilisateur(nom, prenom, age, numero, email, adresse, pseudo, motdepasse) {
  try {
    const nouvelUtilisateur = await Utilisateur.create({
      nom,
      prenom,
      age,
      numero,
      email,
      adresse,
      pseudo,
      motdepasse,
    });
    console.log('Nouvel utilisateur ajouté:', nouvelUtilisateur.toJSON());
  } catch (erreur) {
    console.error('Erreur lors de l\'ajout de l\'utilisateur:', erreur.message);
  }
}

async function verifierUtilisateur(pseudo, motdepasse) {
  try {
    const utilisateur = await Utilisateur.findOne({
      where: {
        psd_utl: pseudo,
        mdp_utl: motdepasse,
      },
    });

    if (utilisateur) {
      console.log("utilisateur trouvé");
      return true;
    } else {
      console.log("utilisateur non trouvé");
      return false;
    }
  } catch (erreur) {
    console.error('Erreur lors de la vérification de l\'utilisateur:', erreur.message);
  }
}

async function supprimerUtilisateur(pseudo) {
  const url = 'http://localhost:3000/utilisateurs-verifier';
  try {
    const utilisateur = await Utilisateur.findOne({
      where: {
        psd_utl: pseudo,
      }
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
    console.error('Erreur lors de la suppression de l\'utilisateur:', erreur.message);
  }
}



