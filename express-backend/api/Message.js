const Message = require("../models/Message");
const Utilisateur = require("../models/Utilisateur");
const Gardien = require("../models/Gardien");
const Proprietaire = require("../models/Proprietaire");

async function ajouterMessage(txt_msg, exp_msg, psd_utl, psd_utl_1) {
  const expediteur = await Utilisateur.findOne({
    where: {
      psd_utl: exp_msg,
    },
  });

  const user1 = await Utilisateur.findOne({
    where: {
      psd_utl: psd_utl,
    },
  });

  const user2 = await Utilisateur.findOne({
    where: {
      psd_utl: psd_utl_1,
    },
  });

  const exp_msg_psd = expediteur.id_utl;
  const id_utl = user1.id_utl;
  const id_utl_1 = user2.id_utl;

  try {
    const nouveauMessage = await Message.create({
      txt_msg,
      exp_msg : exp_msg_psd,
      id_utl,
      id_utl_1,
    });
    console.log("Nouveau message ajouté:", nouveauMessage);
  } catch (erreur) {
    console.error("Erreur lors de l'ajout du message:", erreur.message);
  }
}

async function afficherMessages(psd_utl, psd_utl_1) {
  const user1 = await Utilisateur.findOne({
    where: {
      psd_utl: psd_utl,
    },
  });

  const user2 = await Utilisateur.findOne({
    where: {
      psd_utl: psd_utl_1,
    },
  });

  try {
    const messages = await Message.findAll({
      where: {
        // Use an 'or' operator to retrieve messages where the IDs are either matching or reversed
        or: [
          {
            id_utl: user1.id_utl,
            id_utl_1: user2.id_utl,
          },
          {
            id_utl: user2.id_utl,
            id_utl_1: user1.id_utl,
          },
        ],
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
      conv.push(conversations[i].id_utl_1);
      conv.push(user.id_utl);
    }
    for (let i = 0; i < conversations1.length; i++) {
      if (!conv.includes(conversations1[i].id_utl)) {
        conv.push(conversations1[i].id_utl);
        conv.push(user.id_utl);
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
