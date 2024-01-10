const { Sequelize } = require('sequelize');
const config = require('./config/config.json');


const sequelize = new Sequelize(config.development);



// Vérifiez la connexion à la base de données
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
