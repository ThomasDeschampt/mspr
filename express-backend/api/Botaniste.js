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
  