const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const bodyParser = require("body-parser");
const sequelize = require("./sequelize");
const Utilisateur = require("./models/Utilisateur");
// const Proprietaire = require("./models/Proprietaire");
// const Gardien = require("./models/Gardien");
// const Botaniste = require("./models/Botaniste");
const Conseil = require("./models/Conseil");
const Plante = require("./models/Plante");
const Image = require("./models/Image");
const Message = require("./models/Message");
const utilisateurRoutes = require("./routes/utilisateurRoutes");
const messageRoutes = require("./routes/messageRoutes");
// const botanisteRoutes = require("./routes/botanisteRoutes");
const conseilRoutes = require("./routes/conseilRoutes");
const imageRoutes = require("./routes/imageRoutes");
const planteRoutes = require("./routes/planteRoutes");
// const gardienRoutes = require("./routes/gardienRoutes");
// const proprietaireRoutes = require("./routes/proprietaireRoutes");
const setupSwagger = require("./swagger");

app.use(cors());
app.use(express.json());
app.use("/api/message", messageRoutes);

app.use("/api/utilisateurs", utilisateurRoutes);

// app.use("/api/botaniste", botanisteRoutes);

app.use("/api/conseil", conseilRoutes);

app.use("/api/image", imageRoutes);

app.use("/api/plante", planteRoutes);

// app.use("/api/gardien", gardienRoutes);

// app.use("/api/proprietaire", proprietaireRoutes);


setupSwagger(app)

app.get("/", (req, res) => {
  res.send("Bienvenue sur mon serveur Express !");
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

(async () => {
  try {
    await sequelize.sync();
    console.log("Base de donnée sychronisé.");
  } catch (error) {
    console.error("Incapable de se synchroniser à la base de donnée:", error);
  }
})();
