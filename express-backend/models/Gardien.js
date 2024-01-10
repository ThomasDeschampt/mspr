const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Utilisateur = require('./Utilisateur');

const Gardien = sequelize.define('Gardien', {
  id_utl: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
});

Gardien.belongsTo(Utilisateur, { foreignKey: 'id_utl' });

module.exports = Gardien;
