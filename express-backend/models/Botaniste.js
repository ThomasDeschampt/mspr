const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Utilisateur = require('./Utilisateur');

const Botaniste = sequelize.define('Botaniste', {
  id_utl: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
});

Botaniste.belongsTo(Utilisateur, { foreignKey: 'id_utl' });

module.exports = Botaniste;
