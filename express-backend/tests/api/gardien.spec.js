const { ajouterGardien, verifierGardien } = require("../../api/Gardien");
const Gardien = require("../../models/Gardien");
const Utilisateur = require("../../models/Utilisateur");

jest.mock("../../models/Utilisateur", () => ({
  findOne: jest.fn(),
}));

jest.mock("../../models/Gardien", () => ({
  create: jest.fn(),
  findOne: jest.fn(),
}));

describe("Tests unitaires pour les fonctions API Gardien", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Test de la fonction ajouterGardien", () => {
    it("Devrait ajouter un nouveau gardien", async () => {
      Utilisateur.findOne.mockResolvedValue({ id_utl: 1 });

      Gardien.create.mockResolvedValue({ id_gdn: 1 });

      await ajouterGardien(123);

      expect(Utilisateur.findOne).toHaveBeenCalledWith({
        where: { psd_utl: 123 },
      });

      expect(Gardien.create).toHaveBeenCalledWith({ id_utl: 1 });
    });
  });

  describe("Test de la fonction verifierGardien", () => {
    it("Devrait retourner true si un gardien est trouvé", async () => {
      Utilisateur.findOne.mockResolvedValue({ id_utl: 1 });

      Gardien.findOne.mockResolvedValue({ id_gdn: 1 });

      const result = await verifierGardien(123);

      expect(result).toBe(true);
    });

    it("Devrait retourner false si aucun gardien n'est trouvé", async () => {
      Utilisateur.findOne.mockResolvedValue({ id_utl: 1 });

      Gardien.findOne.mockResolvedValue(null);

      const result = await verifierGardien(123);

      expect(result).toBe(false);
    });

    it("Devrait retourner false si aucun utilisateur n'est trouvé", async () => {
      Utilisateur.findOne.mockResolvedValue(null);

      const result = await verifierGardien(123);

      expect(result).toBe(false);
    });
  });
});
