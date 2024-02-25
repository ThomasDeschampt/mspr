const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Utilisateur = sequelize.define("Utilisateur", {
  id_utl: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom_utl: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  pre_ult: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  age_utl: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  num_utl: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
  eml_utl: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
  adr_utl: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  psd_utl: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
  mdp_utl: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Utilisateur;
