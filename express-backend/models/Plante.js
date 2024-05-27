const { DataTypes, literal } = require("sequelize");
const sequelize = require("../sequelize");
const Utilisateur = require("./Utilisateur");

const Plante = sequelize.define("Plante", {
  id_plt: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  esp_plt: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  dsc_plt: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  nom_plt: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  adr_plt: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  dat_deb_plt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  dat_fin_plt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  id_proprietaire: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_gardien: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Plante.belongsTo(Utilisateur, { foreignKey: 'id_proprietaire', as: 'proprietaire' });
Plante.belongsTo(Utilisateur, { foreignKey: 'id_gardien', as: 'gardien' });

module.exports = Plante;
