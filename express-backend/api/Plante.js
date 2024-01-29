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