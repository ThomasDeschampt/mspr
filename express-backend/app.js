const express = require('express');
const app = express();
const port = 3000;

const sequelize = require('./sequelize');
const Utilisateur = require('./models/Utilisateur');
const Proprietaire = require('./models/Proprietaire');
const Gardien = require('./models/Gardien');
const Botaniste = require('./models/Botaniste');
const Conseil = require('./models/Conseil');
const Conseiller = require('./models/Conseiller');
const Plante = require('./models/Plante');
const Image = require('./models/Image');
const Message = require('./models/Message');


app.get('/', (req, res) => {
  res.send('Hello, world! This is your ExpressJS backend.');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

(async () => {
  try {
    await sequelize.sync();
    console.log('Database synchronized.');
  } catch (error) {
    console.error('Unable to synchronize the database:', error);
  }
})();
