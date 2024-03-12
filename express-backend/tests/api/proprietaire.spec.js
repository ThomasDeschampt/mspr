const { ajouterProprietaire } = require("../../api/Proprietaire");
const Proprietaire = require("../../models/Proprietaire");
const Utilisateur = require("../../models/Utilisateur");

jest.mock("../../models/Proprietaire", () => ({
  create: jest.fn(), 
}));

describe("Test de ajouterProprietaire", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Devrait ajouter un nouveau propriétaire", async () => {
    const findOneSpy = jest.spyOn(Utilisateur, "findOne");
    findOneSpy.mockResolvedValue({ id_utl: 1 });

    Proprietaire.create.mockResolvedValue( { id_utl: 1 });

    console.log = jest.fn();

    await ajouterProprietaire("1");

    expect(findOneSpy).toHaveBeenCalledWith({ where: { psd_utl: "1" } });
    expect(Proprietaire.create).toHaveBeenCalledWith({ id_utl: 1 });
    expect(console.log).toHaveBeenCalledWith(
      "Nouveau propriétaire ajouté:",
      { id_utl: 1 }
    );

    findOneSpy.mockRestore(); 
  });

});
