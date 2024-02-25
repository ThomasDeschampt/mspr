const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");
const Utilisateur = require("./Utilisateur");

const Proprietaire = sequelize.define("Proprietaire", {
  id_utl: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
});

Proprietaire.belongsTo(Utilisateur, { foreignKey: "id_utl" });

module.exports = Proprietaire;
