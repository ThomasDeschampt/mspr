const {
  ajouterUtilisateur,
  verifierUtilisateur,
  supprimerUtilisateur,
} = require("../../api/Utilisateur");
const Utilisateur = require("../../models/Utilisateur");

jest.mock("../../models/Utilisateur", () => ({
  create: jest.fn(),
  findOne: jest.fn(),
}));

describe("Test des fonctions utilisateur", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Devrait ajouter un nouvel utilisateur", async () => {
    const nouvelUtilisateurMock = { nom_utl: "John", pre_ult: "Doe" };
    Utilisateur.create.mockResolvedValue(nouvelUtilisateurMock);

    console.log = jest.fn();

    await ajouterUtilisateur("John", "Doe");

    expect(Utilisateur.create).toHaveBeenCalledWith({
      nom_utl: "John",
      pre_ult: "Doe",
      /* autres arguments */
    });
    expect(console.log).toHaveBeenCalledWith(
      "Nouvel utilisateur ajouté:",
      nouvelUtilisateurMock,
    );
  });

  it("Devrait vérifier l'utilisateur existant", async () => {
    const utilisateurExistantMock = {};
    Utilisateur.findOne.mockResolvedValue(utilisateurExistantMock);

    console.log = jest.fn();

    const resultat = await verifierUtilisateur(
      "psd_utl_existant",
      "mdp_utl_existant",
    );

    expect(resultat).toBe(true);
    expect(console.log).toHaveBeenCalledWith("utilisateur trouvé");
  });

  it("Devrait vérifier l'utilisateur non existant", async () => {
    Utilisateur.findOne.mockResolvedValue(null);

    console.log = jest.fn();

    const resultat = await verifierUtilisateur(
      "psd_utl_non_existant",
      "mdp_utl_non_existant",
    );

    expect(resultat).toBe(false);
    expect(console.log).toHaveBeenCalledWith("utilisateur non trouvé");
  });

  it("Devrait supprimer l'utilisateur existant", async () => {
    const utilisateurExistantMock = {};
    Utilisateur.findOne.mockResolvedValue(utilisateurExistantMock);
    utilisateurExistantMock.destroy = jest.fn().mockResolvedValue(true);

    console.log = jest.fn();

    const resultat = await supprimerUtilisateur("psd_utl_existant");

    expect(resultat).toBe(true);
    expect(console.log).toHaveBeenCalledWith("utilisateur supprimé");
  });

  it("Devrait gérer la suppression de l'utilisateur non existant", async () => {
    Utilisateur.findOne.mockResolvedValue(null);

    console.log = jest.fn();

    const resultat = await supprimerUtilisateur("psd_utl_non_existant");

    expect(resultat).toBe(false);
    expect(console.log).toHaveBeenCalledWith("utilisateur non trouvé");
  });
});
