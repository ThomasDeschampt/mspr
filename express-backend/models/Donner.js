const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");
const Plante = require("./Plante");
const Conseil = require("./Conseil");

const Donner = sequelize.define("Donner", {
  id_plt: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  id_cns: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
});

Donner.belongsTo(Plante, { foreignKey: 'id_plt' });
Donner.belongsTo(Conseil, { foreignKey: 'id_cns' });

module.exports = Donner;
