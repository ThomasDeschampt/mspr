const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Proprietaire = require('./Proprietaire');
const Gardien = require('./Gardien');
const Plante = require('./Plante');

const Image = sequelize.define('Image', {
  id_img: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  dat_img: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  url_img: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  id_utl: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_utl_1: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_plt: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Image.belongsTo(Proprietaire, { foreignKey: 'id_utl' });
Image.belongsTo(Gardien, { foreignKey: 'id_utl_1' });
Image.belongsTo(Plante, { foreignKey: 'id_plt' });

module.exports = Image;
