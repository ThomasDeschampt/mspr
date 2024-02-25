const { DataTypes, literal } = require("sequelize");
const sequelize = require("../sequelize");
const Proprietaire = require("./Proprietaire");
const Gardien = require("./Gardien");

const Plante = sequelize.define("Plante", {
  id_plt: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  esp_plt: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dsc_plt: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nom_plt: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adr_plt: {
    type: DataTypes.STRING,
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
  id_utl: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_utl_1: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Plante.belongsTo(Proprietaire, { foreignKey: "id_utl" });
Plante.belongsTo(Gardien, { foreignKey: "id_utl_1" });

module.exports = Plante;
