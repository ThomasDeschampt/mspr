const Message = require('../models/Utilisateur');

async function ajouterMessage(dat_msg, txt_msg, id_utl, id_utl_1) {
  try {
    const nouveauMessage = await Message.create({
      dat_msg,
      txt_msg,
      id_utl,
      id_utl_1,
    });
    console.log('Nouveau message ajouté:', nouveauMessage.toJSON());
  } catch (erreur) {
    console.error('Erreur lors de l\'ajout du message:', erreur.message);
  }
}

async function afficherMessages(id_utl, id_utl_1) {
  try {
    const messages = await Message.findAll({
      where: {
        id_utl: id_utl,
        id_utl_1: id_utl_1,
      },
      order: [
        ['dat_msg', 'ASC'],
      ],
    });
    console.log("messages trouvés");
    return messages;
  } catch (erreur) {
    console.error('Erreur lors de la récupération des messages:', erreur.message);
  }
}