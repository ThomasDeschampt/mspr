const Message = require("../models/Message");

async function ajouterMessage(txt_msg, id_utl, id_utl_1) {
  try {
    const nouveauMessage = await Message.create({
      txt_msg,
      id_utl,
      id_utl_1,
    });
    console.log("Nouveau message ajouté:", nouveauMessage);
  } catch (erreur) {
    console.error("Erreur lors de l'ajout du message:", erreur.message);
  }
}

async function afficherMessages(id_utl, id_utl_1) {
  try {
    const messages = await Message.findAll({
      where: {
        id_utl: id_utl,
        id_utl_1: id_utl_1,
      },
      order: [["dat_msg", "ASC"]],
    });
    console.log("messages trouvés");
    return messages;
  } catch (erreur) {
    console.error(
      "Erreur lors de la récupération des messages:",
      erreur.message,
    );
  }
}

module.exports = { ajouterMessage, afficherMessages };
