const {
  afficherImage,
  afficherImages,
  ajouterImage,
} = require("../../api/Image");
const Image = require("../../models/Image");

jest.mock("../../models/Image", () => ({
  findOne: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
}));

describe("Test des fonctions d'image", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Test de afficherImage", () => {
    it("Devrait retourner l'image trouvée", async () => {
      const imageMock = { id_img: 1 };
      Image.findOne.mockResolvedValue(imageMock);

      const resultat = await afficherImage(1);

      expect(resultat).toEqual(imageMock);
      expect(Image.findOne).toHaveBeenCalledWith({ where: { id_img: 1 } });
    });

    it("Devrait afficher une erreur en cas de problème", async () => {
      const erreur = new Error("Erreur lors de la récupération de l'image");
      Image.findOne.mockRejectedValue(erreur);

      console.error = jest.fn();

      await afficherImage(1);

      expect(console.error).toHaveBeenCalledWith(
        "Erreur lors de la récupération de l'image:",
        erreur.message,
      );
    });
  });

  describe("Test de afficherImages", () => {
    it("Devrait retourner les images du gardiennage", async () => {
      const imagesMock = [{ id_img: 1 }, { id_img: 2 }];
      Image.findAll.mockResolvedValue(imagesMock);

      const resultat = await afficherImages(1, 2, 3);

      expect(resultat).toEqual(imagesMock);
      expect(Image.findAll).toHaveBeenCalledWith({
        where: { id_utl: 1, id_utl_1: 2, id_plt: 3 },
      });
    });

    it("Devrait afficher une erreur en cas de problème", async () => {
      const erreur = new Error(
        "Erreur lors de la récupération des images du gardiennage",
      );
      Image.findAll.mockRejectedValue(erreur);

      console.error = jest.fn();

      await afficherImages(1, 2, 3);

      expect(console.error).toHaveBeenCalledWith(
        "Erreur lors de la récupération des images du gardiennage:",
        erreur.message,
      );
    });
  });

  describe("Test de ajouterImage", () => {
    it("Devrait ajouter une nouvelle image", async () => {
      const nouvelleImageMock = {
        id_img: 1,
        url_img: "url",
        id_utl: 1,
        id_utl_1: 2,
        id_plt: 3,
      };
      Image.create.mockResolvedValue(nouvelleImageMock);

      await ajouterImage("url", 1, 2, 3);

      expect(Image.create).toHaveBeenCalledWith({
        url_img: "url",
        id_utl: 1,
        id_utl_1: 2,
        id_plt: 3,
      });
    });

    it("Devrait afficher une erreur en cas de problème", async () => {
      const erreur = new Error("Erreur lors de l'ajout de l'image");
      Image.create.mockRejectedValue(erreur);

      console.error = jest.fn();

      await ajouterImage("url", 1, 2, 3);

      expect(console.error).toHaveBeenCalledWith(
        "Erreur lors de l'ajout de l'image:",
        erreur.message,
      );
    });
  });
});
