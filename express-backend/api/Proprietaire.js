
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
  
  