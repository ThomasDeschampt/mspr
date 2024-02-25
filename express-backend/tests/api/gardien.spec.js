const { ajouterGardien } = require("../../api/Gardien");
const Gardien = require("../../models/Gardien");

jest.mock("../../models/Gardien", () => ({
  create: jest.fn(),
}));

describe("Test de la fonction ajouterGardien", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Devrait ajouter un nouveau gardien", async () => {
    const nouveauGardienMock = {
      id_utl: 1,
      toJSON: jest.fn(() => ({ id_utl: 1 })),
    };

    Gardien.create.mockResolvedValue(nouveauGardienMock);

    const spy = jest.spyOn(console, "log");

    await ajouterGardien(1);

    expect(Gardien.create).toHaveBeenCalledWith({ id_utl: 1 });

    expect(spy).toHaveBeenCalledWith("Nouveau gardien ajouté:", { id_utl: 1 });
  });

  it("Devrait afficher une erreur en cas de problème", async () => {
    const erreur = new Error("Erreur lors de la création du gardien");

    Gardien.create.mockRejectedValue(erreur);

    console.error = jest.fn();

    await ajouterGardien(1);

    expect(console.error).toHaveBeenCalledWith(
      "Erreur lors de l'ajout du gardien:",
      erreur.message,
    );
  });
});
