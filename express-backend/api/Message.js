const Message = require("../models/Message");
const Utilisateur = require("../models/Utilisateur");

async function ajouterMessage(txt_msg, exp_msg, id_utl, id_utl_1) {
  try {
    const nouveauMessage = await Message.create({
      txt_msg,
      exp_msg,
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

async function afficherConversations(psd_utl) {
  const user = await Utilisateur.findOne({
    where: {
      psd_utl: psd_utl,
    },
  });
  try {
    const conversations = await Message.findAll({
      where: {
        id_utl: user.id_utl,
      },
      group: ["id_utl_1"],
    });
    const conversations1 = await Message.findAll({
      where: {
        id_utl_1: user.id_utl,
      },
      group: ["id_utl"],
    });
    conv = [];
    for (let i = 0; i < conversations.length; i++) {
      conv.push("Convertation en tant que propriétaire")
      conv.push(conversations[i].id_utl_1);
      conv.push(user.id_utl);
      conv.push("-");
    }
    for (let i = 0; i < conversations1.length; i++) {
      if (!conv.includes(conversations1[i].id_utl)) {
        conv.push("Convertation en tant que gardien")
        conv.push(conversations1[i].id_utl);
        conv.push(user.id_utl);
        conv.push("-");
      }
    }
    return conv;
  
  }
  catch (erreur) {
    console.error(
      "Erreur lors de la récupération des conversations:",
      erreur.message,
    );
  }
}

module.exports = { ajouterMessage, afficherMessages, afficherConversations };
