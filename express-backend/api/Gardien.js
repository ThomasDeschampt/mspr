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
  