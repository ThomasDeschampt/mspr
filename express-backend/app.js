const express = require('express');
const app = express();
const port = 3000;
const router = express.Router();
const utilisateurController = require('./controllers/utilisateurController');


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


const utilisateurRoutes = require('./routes/utilisateurRoutes');

// Middleware pour permettre à ExpressJS de comprendre le JSON dans les requêtes
app.use(express.json());

// Autres configurations de middleware et de routes

// Utilisez les routes spécifiques aux utilisateurs
app.use('/api/utilisateurs', utilisateurRoutes);




app.get('/', (req, res) => {
  res.send('Hello, world! This is your ExpressJS backend.');
});

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


module.exports = router;