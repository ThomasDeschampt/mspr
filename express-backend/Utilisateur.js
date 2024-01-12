const Utilisateur = require('./models/Utilisateur');

async function ajouterUtilisateur(nom, prenom, age, numero, email, adresse, pseudo, motdepasse) {
  try {
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

verifierUtilisateur('moitoi', 'motdepasse')
verifierUtilisateur('caca', 'motdepasse2')

ajouterUtilisateur("moi", "toi", 25, "123452287", "moi@gmail.com", "1 rue de la rue", "moitoi", "motdepasse")
ajouterUtilisateur("moil", "toli", 25, "123452787", "moi@gmmail.com", "1 rue de la rue", "moimtoi", "motdepasse")

supprimerUtilisateur('moitoi')