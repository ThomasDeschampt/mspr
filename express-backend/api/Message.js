// const Message = require("../models/Message");
// const Utilisateur = require("../models/Utilisateur");
// const Proprietaire = require("../models/Proprietaire");
// const Gardien = require("../models/Gardien");
// const { Op } = require('sequelize');

// async function ajouterMessage(txt_msg, exp_msg, psd_utl, psd_utl_1) {
//   const expediteur = await Utilisateur.findOne({ where: { psd_utl: exp_msg } });

//   const user1 = await Utilisateur.findOne({ where: { psd_utl: psd_utl } });
//   const proprio = await Proprietaire.findOne({ where: { id_utl: user1.id_utl } });

//   const user2 = await Utilisateur.findOne({ where: { psd_utl: psd_utl_1 } });
//   const gardien = await Gardien.findOne({ where: { id_utl: user2.id_utl } });

//   id_exp = expediteur.id_utl;
//   id_prop = proprio.id_utl;
//   id_gard = gardien.id_utl;

//   try {
//     const nouveauMessage = await Message.create({
//       txt_msg,
//       id_utl: id_exp,
//       id_utl_1: id_prop,
//       exp_msg: id_gard, 
//     });
//     console.log("Nouveau message ajouté:", nouveauMessage);
//   } catch (erreur) {
//     console.error("Erreur lors de l'ajout du message:", erreur.message);
//   }
// }

// async function afficherMessages(psd_utl, psd_utl_1) {
//   try {
//     // Trouver les utilisateurs par leur pseudo
//     const user1 = await Utilisateur.findOne({ where: { psd_utl: psd_utl } });
//     const user2 = await Utilisateur.findOne({ where: { psd_utl: psd_utl_1 } });
  
//     // Vérifier si les deux utilisateurs ont été trouvés
//     if (!user1 || !user2) {
//       console.error("L'un des utilisateurs n'a pas été trouvé.");
//       return []; // Retourner un tableau vide ou lever une erreur
//     }
  
//     // Récupérer les messages où les ID sont soit dans un ordre, soit dans l'ordre inverse
//     const messages = await Message.findAll({
//       where: {
//         [Op.or]: [
//           { id_utl: user1.id_utl, id_utl_1: user2.id_utl },
//           { id_utl: user2.id_utl, id_utl_1: user1.id_utl },
//         ],
//       },
//       order: [["dat_msg", "ASC"]],
//     });
//     console.log("messages trouvés");
//     return messages;
//   } catch (erreur) {
//     console.error("Erreur lors de la récupération des messages:", erreur.message);
//     throw erreur; // Propager l'erreur pour un traitement ultérieur
//   }
// }

// async function afficherConversations(psd_utl) {
//   const user = await Utilisateur.findOne({
//     where: {
//       psd_utl: psd_utl,
//     },
//   });
//   try {
//     const conversations = await Message.findAll({
//       where: {
//         id_utl: user.id_utl,
//       },
//       group: ["id_utl_1"],
//     });
//     const conversations1 = await Message.findAll({
//       where: {
//         id_utl_1: user.id_utl,
//       },
//       group: ["id_utl"],
//     });
//     conv = [];
//     for (let i = 0; i < conversations.length; i++) {
//       conv.push(conversations[i].id_utl_1);
//       conv.push(user.id_utl);
//     }
//     for (let i = 0; i < conversations1.length; i++) {
//       if (!conv.includes(conversations1[i].id_utl)) {
//         conv.push(conversations1[i].id_utl);
//         conv.push(user.id_utl);
//       }
//     }
//     return conv;
  
//   }
//   catch (erreur) {
//     console.error(
//       "Erreur lors de la récupération des conversations:",
//       erreur.message,
//     );
//   }
// }

// module.exports = { ajouterMessage, afficherMessages, afficherConversations };
