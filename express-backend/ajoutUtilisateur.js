const Utilisateur = require('./models/Utilisateur');

async function ajouterUtilisateur() {
  try {
    // Utilisation de la méthode `create` pour ajouter un nouvel utilisateur
    const nouvelUtilisateur = await Utilisateur.create({
      nom_utl: 'John',
      pre_ult: 'Doe',
      age_utl: 25,
      num_utl: '123456789',
      eml_utl: 'john.doe@example.com',
      adr_utl: '123 Main Street',
      psd_utl: 'johndoe',
      mdp_utl: 'motdepasse',
    });

    console.log('Nouvel utilisateur ajouté:', nouvelUtilisateur.toJSON());
  } catch (erreur) {
    console.error('Erreur lors de l\'ajout de l\'utilisateur:', erreur.message);
  }
}

ajouterUtilisateur();
