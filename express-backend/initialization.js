const { ajouterUtilisateur } = require('./api/Utilisateur');
const { ajouterGardien } = require('./api/Gardien');
const { ajouterProprietaire } = require('./api/Proprietaire');
const { ajouterBotaniste } = require('./api/Botaniste');
const { ajouterMessage } = require('./api/Message');

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

async function ajouterMessages() {
  await ajouterMessage("Message 1 du gardien", 0, 1, 2);
  await ajouterMessage("Message 1 du propriétaire", 0, 1, 2);
  await ajouterMessage("Message 2 de propriétaire", 0, 1, 2);
  await ajouterMessage("Message 2 du gardien", 0, 1, 2);
}

async function ajouterMessages() {
  await ajouterMessage("Message 1 du gardien", 2, 0, 1);
  await ajouterMessage("Message 1 du propriétaire", 1, 0, 1);
  await ajouterMessage("Message 2 de propriétaire", 1, 0, 1);
  await ajouterMessage("Message 2 du gardien", 2, 0, 1);
}

async function ajouterImages() {
  await ajouterImage("https://media.istockphoto.com/id/1380361370/fr/photo/bananier-décoratif-en-vase-en-béton-isolé-sur-fond-blanc.jpg?s=612x612&w=0&k=20&c=Sbo0kQTPXca_yhal1n9KUAbXj1B9NNAXmDdPYMNUDDM=",
   0, 1, 0);
   await ajouterImage("https://media.istockphoto.com/id/1303363400/fr/vectoriel/belle-composition-verte-dintérieur-et-de-fleurs.jpg?s=612x612&w=0&k=20&c=sO6NKKeHp-M1ggtfIEiiCf1pXWlYWdJ-FkBFDHxdukA=",
   0, 0, 0);
}

async function ajouterConseils() {
  await  ajouterConseil("Conseil pour la plante 1 avec le botaniste", 0, 0);
}

ajouterUtilisateurs();
ajouterMessages();
ajouterImages();
ajouterConseils();
