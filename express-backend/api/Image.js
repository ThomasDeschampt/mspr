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
  