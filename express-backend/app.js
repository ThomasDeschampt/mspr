const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
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
const utilisateurRoutes = require("./routes/utilisateurRoutes")

app.use(express.json());

app.use("/api/utilisateurs", utilisateurRoutes);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

(async () => {
  try {
    await sequelize.sync();
    console.log('Base de donnée sychronisé.');
  } catch (error) {
    console.error('Incapable de se synchroniser à la base de donnée:', error);
  }
})();