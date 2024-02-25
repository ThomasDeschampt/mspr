const Image = require('../models/Image');


async function afficherImage(id_img) {
  try {
    const image = await Image.findOne({
      where: {
        id_img: id_img,
      }
    });
    return image;
  } catch (erreur) {
    console.error('Erreur lors de la récupération de l\'image:', erreur.message);
  }
}

async function afficherImages(id_utl, id_utl_1, id_plt) {
  try {
    const images = await Image.findAll({
      where: {
        id_utl: id_utl,
        id_utl_1: id_utl_1,
        id_plt: id_plt
      }
    });
    return images;
  } catch (erreur) {
    console.error('Erreur lors de la récupération des images du gardiennage:', erreur.message);
  }
}

async function ajouterImage(url_img, id_utl, id_utl_1, id_plt) {
  try {
    const image = await Image.create({
      url_img: url_img,
      id_utl: id_utl,
      id_utl_1: id_utl_1,
      id_plt: id_plt
    });
    console.log('Nouvelle image ajoutée:', image.toJSON());
  } catch (erreur) {
    console.error('Erreur lors de l\'ajout de l\'image:', erreur.message);
  }
}

module.exports = { afficherImage, ajouterImage, afficherImages };