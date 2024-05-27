const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost', 
  port: 8889,
  username: 'root@localhost',
  password: 'root', 
  database: 'mspr' 
});

module.exports = sequelize;
