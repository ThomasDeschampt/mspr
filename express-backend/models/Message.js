const { DataTypes, literal } = require("sequelize");
const sequelize = require("../sequelize");
const Proprietaire = require("./Proprietaire");
const Gardien = require("./Gardien");
const Utilisateur = require("./Utilisateur");

const Message = sequelize.define("Message", {
  id_msg: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  dat_msg: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: literal("CURRENT_TIMESTAMP"),
  },
  txt_msg: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  exp_msg: {
    type: DataTypes.INTEGER,
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

Message.belongsTo(Proprietaire, { foreignKey: "id_utl" });
Message.belongsTo(Gardien, { foreignKey: "id_utl_1" });
Message.belongsTo(Utilisateur, { foreignKey: "exp_msg" })

module.exports = Message;
