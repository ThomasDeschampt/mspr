const Utilisateur = require('../models/Utilisateur');

exports.inscrireUtilisateur = async (req, res) => {
  const { nom, prenom, age, numero, email, adresse, pseudo, motdepasse } = req.body;

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
    res.json({ message: 'Inscription réussie' });
  } catch (erreur) {
    console.error('Erreur lors de l\'inscription de l\'utilisateur:', erreur.message);
    res.status(500).json({ message: 'Erreur lors de l\'inscription de l\'utilisateur' });
  }
};
