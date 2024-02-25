const {
  afficherConseillage,
  ajouterConseillage,
} = require("../../api/Conseiller");
const Conseiller = require("../../models/Conseiller");

jest.mock("../../models/Conseiller", () => ({
  findOne: jest.fn(),
  create: jest.fn(),
}));

describe("Test des fonctions de conseillage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Test de afficherConseillage", () => {
    it("Devrait retourner le conseillage trouvé", async () => {
      const conseillageMock = { id_cns: 1 };
      Conseiller.findOne.mockResolvedValue(conseillageMock);

      const resultat = await afficherConseillage(1);

      expect(resultat).toEqual(conseillageMock);
      expect(Conseiller.findOne).toHaveBeenCalledWith({ where: { id_cns: 1 } });
    });

    it("Devrait afficher une erreur en cas de problème", async () => {
      const erreur = new Error("Erreur de recherche");
      Conseiller.findOne.mockRejectedValue(erreur);

      await expect(afficherConseillage(1)).rejects.toThrow(
        "Erreur de recherche",
      );
    });
  });

  describe("Test de ajouterConseillage", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("Devrait ajouter un nouveau conseillage", async () => {
      const id_cns = 1;
      const id_utl = 1;

      const nouveauConseillageMock = { id_cns: id_cns, id_utl: id_utl };

      Conseiller.create.mockResolvedValue(nouveauConseillageMock);

      await ajouterConseillage(id_cns, id_utl);

      expect(Conseiller.create).toHaveBeenCalledWith({
        id_cns: id_cns,
        id_utl: id_utl,
      });
    });

    it("Devrait afficher une erreur en cas de problème", async () => {
      const erreur = new Error("Erreur lors de la création du conseillage");

      Conseiller.create.mockRejectedValue(erreur);

      console.error = jest.fn();

      await ajouterConseillage(1, 1);

      expect(console.error).toHaveBeenCalledWith(
        "Erreur lors de l'ajout du conseillage",
      );
    });
  });
});
