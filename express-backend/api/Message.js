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