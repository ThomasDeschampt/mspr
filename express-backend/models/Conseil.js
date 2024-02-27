const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");
const Plante = require("./Plante");
const Botaniste = require("./Botaniste");

const Conseil = sequelize.define("Conseil", {
  id_cns: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  dsc_csn: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  id_plt: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_utl: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Conseil.belongsTo(Plante, { foreignKey: "id_plt" })
Conseil.belongsTo(Botaniste, { foreignKey: "id_utl" })

module.exports = Conseil;

