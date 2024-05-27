const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");
const Conversation = require("./Conversation");
const Utilisateur = require("./Utilisateur");

const MessageConversation = sequelize.define("MessageConversation", {
  id_msg: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_conv: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dat_msg: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  txt_msg: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  id_sender: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'unread',
  },
});

MessageConversation.belongsTo(Conversation, { foreignKey: 'id_conv' });
MessageConversation.belongsTo(Utilisateur, { foreignKey: 'id_sender', as: 'sender' });

module.exports = MessageConversation;
