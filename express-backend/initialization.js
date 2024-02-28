const { ajouterUtilisateur } = require('./api/Utilisateur');
const { ajouterGardien } = require('./api/Gardien');
const { ajouterProprietaire } = require('./api/Proprietaire');
const { ajouterBotaniste } = require('./api/Botaniste');
const { ajouterMessage } = require('./api/Message');
const { ajouterImage } = require('./api/Image');
const { ajouterConseil } = require('./api/Conseil');
const { ajouterPlante, ajouterGardienPlante } = require('./api/Plante');


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

    await ajouterGardien(1);
    await ajouterGardien(3);
    console.log("Gardiens ajoutés avec succès !");

    await ajouterProprietaire(2);
    console.log("Propriétaire ajouté avec succès !");

    await ajouterBotaniste(4);
    console.log("Botaniste ajouté avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'ajout :", error);
  }
}

async function ajouterPlantes() {
  await ajouterPlante("test", "test", "test", "test", "01/01/2025", "12/12/2025", "proprietaire", "default");
}

async function ajouterGardiensPlantes() {
  await ajouterGardienPlante(1, 1);
}

async function ajouterMessages() {
  await ajouterMessage("Message 1 du gardien", 3, 1, 2);
  await ajouterMessage("Message 1 du propriétaire", 2, 1, 2);
  await ajouterMessage("Message 2 de propriétaire", 2, 1, 2);
  await ajouterMessage("Message 2 du gardien", 3, 1, 2);
}

async function ajouterImages() {
  await ajouterImage("https://media.istockphoto.com/id/1380361370/fr/photo/bananier-décoratif-en-vase-en-béton-isolé-sur-fond-blanc.jpg?s=612x612&w=0&k=20&c=Sbo0kQTPXca_yhal1n9KUAbXj1B9NNAXmDdPYMNUDDM=",
   1, 2, 1);
   await ajouterImage("https://media.istockphoto.com/id/1303363400/fr/vectoriel/belle-composition-verte-dintérieur-et-de-fleurs.jpg?s=612x612&w=0&k=20&c=sO6NKKeHp-M1ggtfIEiiCf1pXWlYWdJ-FkBFDHxdukA=",
   1, 1, 1);
}

async function ajouterConseils() {
  await  ajouterConseil("Conseil pour la plante 1 avec le botaniste", 1, 1);
}

ajouterUtilisateurs();
ajouterPlantes();
ajouterGardiensPlantes();
ajouterMessages();
ajouterImages();
ajouterConseils();
