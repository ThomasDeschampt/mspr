const Utilisateur = require("../models/Utilisateur");
const bcrypt = require('bcrypt');
const crypto = require('crypto');


const encryptionKey = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(encryptionKey), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts[0], 'hex');
  const encryptedText = Buffer.from(textParts[1], 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(encryptionKey), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

async function ajouterUtilisateur(
  nom_utl,
  pre_ult,
  age_utl,
  num_utl,
  eml_utl,
  adr_utl,
  psd_utl,
  mdp_utl,
) {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(mdp_utl, saltRounds);
    const encryptedNom = encrypt(nom_utl);
    const encryptedPrenom = encrypt(pre_ult);
    const encryptedAge = encrypt(age_utl.toString());
    const encryptedNum = encrypt(num_utl);
    const encryptedEmail = encrypt(eml_utl);
    const encryptedAdresse = encrypt(adr_utl);

    const nouvelUtilisateur = await Utilisateur.create({
      nom_utl : encryptedNom,
      pre_ult : encryptedPrenom,
      age_utl : encryptedAge,
      num_utl : encryptedNum,
      eml_utl : encryptedEmail,
      adr_utl : encryptedAdresse,
      psd_utl,
      mdp_utl: hashedPassword,
    });
    console.log("Nouvel utilisateur ajouté:", nouvelUtilisateur);
  } catch (erreur) {
    console.error("Erreur lors de l'ajout de l'utilisateur:", erreur.message);
  }
}


async function verifierUtilisateur(psd_utl, mdp_utl) {
  try {
    const utilisateur = await Utilisateur.findOne({
      where: {
        psd_utl: psd_utl,
      },
    });

    if (!utilisateur) {
      console.log("Utilisateur non trouvé");
      return false;
    }

    // Comparaison du mot de passe fourni avec le mot de passe haché stocké
    const motDePasseValide = await bcrypt.compare(mdp_utl, utilisateur.mdp_utl);

    if (motDePasseValide) {
      console.log("Utilisateur trouvé"); // Imprimez uniquement "Utilisateur trouvé" ici
      return true;
    } else {
      console.log("Mot de passe incorrect");
      return false;
    }
  } catch (erreur) {
    console.error("Erreur lors de la vérification de l'utilisateur:", erreur.message);
  }
}


async function afficherPseudo(id_utl){
  try {
    const utilisateur = await Utilisateur.findOne({
      where: {
        id_utl: id_utl,
      },
    });

    if (utilisateur) {
      console.log("utilisateur trouvé");
      return utilisateur.psd_utl;
    } else {
      console.log("utilisateur non trouvé");
      return false;
    }
  } catch (erreur) {
    console.error(
      "Erreur lors de la vérification de l'utilisateur:",
      erreur.message,
    );
  }
}

async function supprimerUtilisateur(psd_utl) {
  try {
    const utilisateur = await Utilisateur.findOne({
      where: {
        psd_utl: psd_utl,
      },
    });

    if (utilisateur) {
      await utilisateur.destroy();
      console.log("utilisateur supprimé");
      return true;
    } else {
      console.log("utilisateur non trouvé");
      return false;
    }
  } catch (erreur) {
    console.error(
      "Erreur lors de la suppression de l'utilisateur:",
      erreur.message,
    );
  }
}

async function afficherId(psd_utl) {
  try {
    const utilisateur = await Utilisateur.findOne({
      where: {
        psd_utl: psd_utl,
      },
    });

    if (utilisateur) {
      console.log("utilisateur trouvé");
      return utilisateur.id_utl;
    } else {
      console.log("utilisateur non trouvé");
      return false;
    }
  } catch (erreur) {
    console.error(
      "Erreur lors de la vérification de l'utilisateur:",
      erreur.message,
    );
  }
}

module.exports = {
  ajouterUtilisateur,
  verifierUtilisateur,
  supprimerUtilisateur,
  afficherPseudo,
  afficherId
};