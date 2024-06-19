const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost', 
  port: 3306,
  username: 'root',
  database: 'mspr' 
});

module.exports = sequelize;
