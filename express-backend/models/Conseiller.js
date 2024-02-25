const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");
const Conseil = require("./Conseil");
const Botaniste = require("./Botaniste");

const Conseiller = sequelize.define("Conseiller", {
  id_cns: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  id_utl: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
});

Conseiller.belongsTo(Conseil, { foreignKey: "id_cns" });
Conseiller.belongsTo(Botaniste, { foreignKey: "id_utl" });

module.exports = Conseiller;
