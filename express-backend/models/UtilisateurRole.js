const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");
const Utilisateur = require("./Utilisateur");
const Role = require("./role");

const UtilisateurRole = sequelize.define("UtilisateurRole", {
  id_utl: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  id_role: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
});

UtilisateurRole.belongsTo(Utilisateur, { foreignKey: 'id_utl' });
UtilisateurRole.belongsTo(Role, { foreignKey: 'id_role' });

module.exports = UtilisateurRole;
