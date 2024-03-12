const Conseil = require("../../models/Conseil");
const { ajouterConseil, afficherConseil } = require("../../api/Conseil");

jest.mock("../../models/Conseil", () => {
  const SequelizeMock = require("sequelize-mock");
  const dbMock = new SequelizeMock();
  return dbMock.define("Conseil", {
    id_cns: 1,
    dsc_csn: "Nouveau conseil",
  });
});

Conseil.findOne = jest.fn();
Conseil.findOne.mockResolvedValue(null);

describe("Tests unitaires pour le modèle Conseil et les fonctions API associées", () => {

  describe("Test de la fonction afficherConseil", () => {
    it("Devrait renvoyer null si aucun conseil n'est trouvé", async () => {
      const conseil = await afficherConseil(999);
      expect(conseil).toBeNull();
    });
  });
});
