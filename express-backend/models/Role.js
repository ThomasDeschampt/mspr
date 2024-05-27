const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Role = sequelize.define("Role", {
  id_role: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  role_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
});

module.exports = Role;
