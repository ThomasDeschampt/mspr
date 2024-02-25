const Utilisateur = require("../../models/Utilisateur");
const Botaniste = require("../../models/Botaniste");
const { ajouterBotaniste, estBotaniste } = require("../../api/Botaniste");

jest.mock("../../models/Botaniste", () => {
  const SequelizeMock = require("sequelize-mock");
  const dbMock = new SequelizeMock();
  return {
    create: jest.fn(),
    findOne: jest.fn(),
  };
});

jest.mock("../../models/Utilisateur", () => {
  const SequelizeMock = require("sequelize-mock");
  const dbMock = new SequelizeMock();
  return {
    findOne: jest.fn(),
  };
});

describe("Tests unitaires pour les fonctions Botaniste", () => {
  describe("Test de la fonction ajouterBotaniste", () => {
    it("Devrait appeler la fonction Botaniste.create avec le bon argument", async () => {
      const BotanisteMock = require("../../models/Botaniste");
      BotanisteMock.create.mockResolvedValueOnce({ id_utl: 123 });
      await ajouterBotaniste(123);
      expect(BotanisteMock.create).toHaveBeenCalledWith({ id_utl: 123 });
    });
  });

  describe("Test de la fonction estBotaniste", () => {
    it("Devrait renvoyer true si un botaniste est trouvé", async () => {
      const UtilisateurMock = require("../../models/Utilisateur");
      UtilisateurMock.findOne.mockResolvedValueOnce({ id_utl: 123 });
      const BotanisteMock = require("../../models/Botaniste");
      BotanisteMock.findOne.mockResolvedValueOnce({ id_utl: 123 });
      const result = await estBotaniste("psd_utl");
      expect(result).toBe(true);
    });
  });
});
