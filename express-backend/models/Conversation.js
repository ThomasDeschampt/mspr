const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");
const Plante = require("./Plante");
const Utilisateur = require("./Utilisateur");

const Conversation = sequelize.define("Conversation", {
  id_conv: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_plt: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_utl1: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_utl2: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('chat', 'email'),
    allowNull: false,
  },
});

Conversation.belongsTo(Plante, { foreignKey: 'id_plt' });
Conversation.belongsTo(Utilisateur, { foreignKey: 'id_utl1', as: 'Utilisateur1' });
Conversation.belongsTo(Utilisateur, { foreignKey: 'id_utl2', as: 'Utilisateur2' });

module.exports = Conversation;
