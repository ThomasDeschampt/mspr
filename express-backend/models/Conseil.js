const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Conseil = sequelize.define('Conseil', {
  id_cns: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  dsc_csn: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Conseil;
