const Utilisateur = require('./models/Utilisateur');

async function ajouterUtilisateur(nom, prenom, age, numero, email, adresse, pseudo, motdepasse) {
  try {
    // Utilisation de la méthode `create` pour ajouter un nouvel utilisateur
    const nouvelUtilisateur = await Utilisateur.create({
      nom_utl: nom,
      pre_ult: prenom,
      age_utl: age,
      num_utl: numero,
      eml_utl: email,
      adr_utl: adresse,
      psd_utl: pseudo,
      mdp_utl: motdepasse,
    });

    console.log('Nouvel utilisateur ajouté:', nouvelUtilisateur.toJSON());
  } catch (erreur) {
    console.error('Erreur lors de l\'ajout de l\'utilisateur:', erreur.message);
  }
}

async function verifierUtilisateur(pseudo, motdepasse) {
  try {
    const utilisateur = await Utilisateur.findOne({
      psd_utl: pseudo,
      mdp_utl: motdepasse,
    });

    if (utilisateur) {
      return true;
    } else {
      return false;
    }
  } catch (erreur) {
    console.error('Erreur lors de la vérification de l\'utilisateur:', erreur.message);
  }
}

async function supprimerUtilisateur(pseudo) {
  try {
    const utilisateur = await Utilisateur.findOne({
      psd_utl: pseudo,
    });

    if (utilisateur) {
      await utilisateur.destroy();
      return true;
    } else {
      return false;
    }
  } catch (erreur) {
    console.error('Erreur lors de la suppression de l\'utilisateur:', erreur.message);
  }
}

ajouterUtilisateur();
