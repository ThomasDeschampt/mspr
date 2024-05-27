const { DataTypes, literal } = require("sequelize");
const sequelize = require("../sequelize");
const Utilisateur = require("./Utilisateur");
const Plante = require("./Plante");

const Image = sequelize.define("Image", {
  id_img: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  dat_img: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: literal("CURRENT_TIMESTAMP"),
  },
  url_img: {
    type: DataTypes.STRING(200),
    allowNull: false,
    unique: true,
  },
  id_utl: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_plt: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Image.belongsTo(Utilisateur, { foreignKey: 'id_utl' });
Image.belongsTo(Plante, { foreignKey: 'id_plt' });

module.exports = Image;
