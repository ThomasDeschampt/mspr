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