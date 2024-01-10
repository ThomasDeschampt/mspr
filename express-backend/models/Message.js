const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Proprietaire = require('./Proprietaire');
const Gardien = require('./Gardien');

const Message = sequelize.define('Message', {
  id_msg: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  dat_msg: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  txt_msg: {
    type: DataTypes.STRING,
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

Message.belongsTo(Proprietaire, { foreignKey: 'id_utl' });
Message.belongsTo(Gardien, { foreignKey: 'id_utl_1' });

module.exports = Message;
