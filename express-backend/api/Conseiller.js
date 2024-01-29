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