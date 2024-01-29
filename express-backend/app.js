const express = require('express');
const app = express();
const port = 3000;
const router = express.Router();


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

app.use(express.json());

app.get('/utilisateurs', async (req, res) => {
  const utilisateurs = await Utilisateur.findAll();
  res.json(utilisateurs);
});

app.post('/utilisateurs', async (req, res) => {
  try {
    const utilisateur = await Utilisateur.create(req.body);
    res.json(utilisateur);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/proprietaires', async (req, res) => {
  const proprietaires = await Proprietaire.findAll();
  res.json(proprietaires);
});

app.post('/proprietaires', async (req, res) => {
  try {
    const proprietaire = await Proprietaire.create(req.body);
    res.json(proprietaire);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/gardien', async (req, res) => {
  const gardiens = await Gardien.findAll();
  res.json(gardiens);
});

app.post('/gardien', async (req, res) => {
  try {
    const gardien = await Gardien.create(req.body);
    res.json(gardien);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/botaniste', async (req, res) => {
  const botanistes = await Botaniste.findAll();
  res.json(botanistes);
});

app.post('/botaniste', async (req, res) => {
  try {
    const botaniste = await Botaniste.create(req.body);
    res.json(botaniste);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/conseil', async (req, res) => {
  const conseils = await Conseil.findAll();
  res.json(conseils);
});

app.post('/conseil', async (req, res) => {
  try {
    const conseil = await Conseil.create(req.body);
    res.json(conseil);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/conseiller', async (req, res) => {
  const conseillers = await Conseiller.findAll();
  res.json(conseillers);
});

app.post('/conseiller', async (req, res) => {
  try {
    const conseiller = await Conseiller.create(req.body);
    res.json(conseiller);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/plante', async (req, res) => {
  const plantes = await Plante.findAll();
  res.json(plantes);
});

app.post('/plante', async (req, res) => {
  try {
    const plante = await Plante.create(req.body);
    res.json(plante);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/image', async (req, res) => {
  const images = await Image.findAll();
  res.json(images);
});

app.post('/image', async (req, res) => {
  try {
    const image = await Image.create(req.body);
    res.json(image);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/message', async (req, res) => {
  const messages = await Message.findAll();
  res.json(messages);
});

app.post('/message', async (req, res) => {
  try {
    const message = await Message.create(req.body);
    res.json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

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