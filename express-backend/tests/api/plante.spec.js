const Plante = require("../../models/Plante");
const {
  afficherPlante,
  afficherPlanteFaitesGardees,
  afficherPlanteGardees,
  recupererlocalisation,
  ajouterPlante,
  ajouterGardienPlante,
} = require("../../api/Plante");

const Utilisateur = require("../../models/Utilisateur");

jest.mock("../../models/Utilisateur", () => ({
  findOne: jest.fn(),
}));

jest.mock("../../models/Plante", () => ({
  findOne: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
}));


describe("Test des fonctions liées aux plantes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Test de afficherPlante", () => {
    it("Devrait retourner la plante trouvée", async () => {
      const planteMock = { id_plt: 1, adr_plt: "Adresse" };
      jest.spyOn(Plante, 'findOne').mockResolvedValue(planteMock);
  
      const resultat = await afficherPlante("Adresse");
  
      expect(resultat).toEqual(planteMock);
      expect(Plante.findOne).toHaveBeenCalledWith({ where: { adr_plt: "Adresse" } });
    });
  

    it("Devrait afficher une erreur en cas de problème", async () => {
      const erreur = new Error("Erreur lors de la récupération de la plante");
      Plante.findOne.mockRejectedValue(erreur);

      console.error = jest.fn();

      await afficherPlante(1);

      expect(console.error).toHaveBeenCalledWith(
        "Erreur lors de la récupération de la plante:",
        erreur.message
      );
    });
  });

  describe("Test de afficherPlanteGardees", () => {
    it("Devrait retourner les plantes gardées par l'utilisateur spécifié", async () => {
      const plantesGardeesMock = [{ id_plt: 1 }, { id_plt: 2 }];
      jest.spyOn(Utilisateur, 'findOne').mockResolvedValue({ id_utl: 1 });
      jest.spyOn(Plante, 'findAll').mockResolvedValue(plantesGardeesMock);
    
      const resultat = await afficherPlanteGardees(1);
    
      expect(resultat).toEqual(plantesGardeesMock);
      expect(Plante.findAll).toHaveBeenCalledWith({ where: { id_utl_1: 1 } });
    });

    it("Devrait afficher une erreur en cas de problème", async () => {
      const erreur = new Error(
        "Erreur lors de la récupération des plantes gardees"
      );
      Plante.findAll.mockRejectedValue(erreur);

      console.error = jest.fn();

      await afficherPlanteGardees(1);

      expect(console.error).toHaveBeenCalledWith(
        "Erreur lors de la récupération des plantes gardees:",
        erreur.message
      );
    });
  });

  describe("Test de afficherPlanteFaitesGardees", () => {
    it("Devrait retourner les plantes faites gardées par l'utilisateur spécifié", async () => {
      const plantesFaitesGardeesMock = [{ id_plt: 3 }, { id_plt: 4 }]; // Liste simulée de plantes
      Plante.findAll.mockResolvedValue(plantesFaitesGardeesMock);

      const resultat = await afficherPlanteFaitesGardees(1);

      
      expect(resultat).toEqual(plantesFaitesGardeesMock);
      expect(Plante.findAll).toHaveBeenCalledWith({ where: { psd_utl: 1 } });
    });

    it("Devrait afficher une erreur en cas de problème", async () => {
      const erreur = new Error(
        "Erreur lors de la récupération des plantes faites gardees"
      );
      Plante.findAll.mockRejectedValue(erreur);

      console.error = jest.fn();

      await afficherPlanteFaitesGardees(1);

      expect(console.error).toHaveBeenCalledWith(
        "Erreur lors de la récupération des plantes faites gardees:",
        erreur.message
      );
    });
  });

  describe("Test de recupererlocalisation", () => {
    
    it("Devrait afficher une erreur en cas de problème", async () => {
      const erreur = new Error(
        "Erreur lors de la récupération de la localisation de la plante"
      );
      Plante.findAll.mockRejectedValue(erreur);

      console.error = jest.fn();

      await recupererlocalisation();

      expect(console.error).toHaveBeenCalledWith(
        "Erreur lors de la récupération de la localisation de la plante:",
        erreur.message
      );
    });
  });

  describe("Test de ajouterPlante", () => {
    it("Devrait ajouter une nouvelle plante", async () => {
      const nouvellePlanteMock = {
        id_plt: 5,
        esp_plt: "Espèce",
        dsc_plt: "Description",
        nom_plt: "Nom",
        adr_plt: "Adresse",
        dat_deb_plt: "2024-02-27",
        dat_fin_plt: "2024-03-27",
        id_utl: 1,
        id_utl_1: 3,
      };
      Plante.create.mockResolvedValue(nouvellePlanteMock);

      console.log = jest.fn();

      await ajouterPlante(
        "Espèce",
        "Description",
        "Nom",
        "Adresse",
        "2024-02-27",
        "2024-03-27",
        1
      );

      expect(Plante.create).toHaveBeenCalledWith({
        esp_plt: "Espèce",
        dsc_plt: "Description",
        nom_plt: "Nom",
        adr_plt: "Adresse",
        dat_deb_plt: "2024-02-27",
        dat_fin_plt: "2024-03-27",
        id_utl: 1,
        id_utl_1: 1,
      });
      expect(console.log).toHaveBeenCalledWith(
        "Nouvelle plante ajoutée:",
        nouvellePlanteMock
      );
    });

    it("Devrait afficher une erreur en cas de problème", async () => {
      const erreur = new Error("Erreur lors de l'ajout de la plante");
      Plante.create.mockRejectedValue(erreur);

      console.error = jest.fn();

      await ajouterPlante(
        "Espèce",
        "Description",
        "Nom",
        "Adresse",
        "2024-02-27",
        "2024-03-27",
        1
      );

      expect(console.error).toHaveBeenCalledWith(
        "Erreur lors de l'ajout de la plante:",
        erreur.message
      );
    });
  });

  describe("Test de ajouterGardienPlante", () => {
    it("Devrait ajouter un gardien à la plante spécifiée", async () => {
      const planteAUpdateMock = { id_plt: 5, id_utl_1: null };
      Plante.update.mockResolvedValue(planteAUpdateMock);

      console.log = jest.fn();

      await ajouterGardienPlante(5, 1);

      expect(Plante.update).toHaveBeenCalledWith(
        { id_utl_1: 1 },
        { where: { id_plt: 5 } }
      );
      expect(console.log).toHaveBeenCalledWith("Gardien ajouté à la plante");
    });

    it("Devrait afficher une erreur en cas de problème", async () => {
      const erreur = new Error("Erreur lors de l'ajout du gardien à la plante");
      Plante.update.mockRejectedValue(erreur);

      console.error = jest.fn();

      await ajouterGardienPlante(5, 1);

      expect(console.error).toHaveBeenCalledWith(
        "Erreur lors de l'ajout du gardien à la plante:",
        erreur.message
      );
    });
  });
});
