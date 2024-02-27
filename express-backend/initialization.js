const { ajouterUtilisateur } = require('./api/Utilisateur');
const { ajouterGardien } = require('./api/Gardien');
const { ajouterProprietaire } = require('./api/Proprietaire');
const { ajouterBotaniste } = require('./api/Botaniste');

async function ajouterUtilisateurs() {
  try {
    await ajouterUtilisateur("default", "default", 18, "000000000", "default", "default", "default", "default");
    console.log("Utilisateur par défaut ajouté avec succès !");

    await ajouterUtilisateur("proprietaire", "proprietaire", 18, "0000000001", "proprietaire", "proprietaire", "proprietaire", "proprietaire");
    console.log("Propriétaire ajouté avec succès !");

    await ajouterUtilisateur("gardien", "gardien", 18, "0000000002", "gardien", "gardien", "gardien", "gardien");
    console.log("Gardien ajouté avec succès !");

    await ajouterUtilisateur("botaniste", "botaniste", 18, "0000000003", "botaniste", "botaniste", "botaniste", "botaniste");
    console.log("Botaniste ajouté avec succès !");

    await ajouterGardien(0);
    await ajouterGardien(2);
    console.log("Gardiens ajoutés avec succès !");

    await ajouterProprietaire(1);
    console.log("Propriétaire ajouté avec succès !");

    await ajouterBotaniste(3);
    console.log("Botaniste ajouté avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'ajout :", error);
  }
}

ajouterUtilisateurs();
