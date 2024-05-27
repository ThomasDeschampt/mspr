const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");
const Conseil = require("./Conseil");
const Utilisateur = require("./Utilisateur");

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

Conseiller.belongsTo(Conseil, { foreignKey: 'id_cns' });
Conseiller.belongsTo(Utilisateur, { foreignKey: 'id_utl' });

module.exports = Conseiller;
