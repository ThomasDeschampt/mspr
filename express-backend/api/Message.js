const Message = require("../models/Message");
const Utilisateur = require("../models/Utilisateur");

async function ajouterMessage(id_conv, dat_msg, txt_msg, id_sender) {

  try {
    const nouveauMessage = await Message.create({
        id_conv: id_conv,
        dat_msg: dat_msg,
        txt_msg: txt_msg,
        id_sender: id_sender,
    });
    res.status(200).json({
      message: "Message ajouté",
    });
    console.log("Nouveau message ajouté:", nouveauMessage);
  } catch (erreur) {
    console.error("Erreur lors de l'ajout du message:", erreur.message);
    res.status(500).json({
      message: "Erreur lors de l'ajout du message",
      erreur: erreur.message,
    });
  }
}

async function afficherMessages(id_conv) {
  try {
    const messages = await Message.findAll({
      where: {
        id_conv: id_conv,
      },
      order: [["dat_msg", "ASC"]],
    });
    console.log("messages trouvés");
    return messages;
  } catch (erreur) {
    console.error("Erreur lors de la récupération des messages:", erreur.message);
    throw erreur;
  }
}


module.exports = { ajouterMessage, afficherMessages };
