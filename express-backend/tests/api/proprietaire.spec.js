const { ajouterProprietaire } = require('../../api/Proprietaire');
const Proprietaire = require('../../models/Proprietaire');

jest.mock('../../models/Proprietaire', () => ({
  create: jest.fn(),
}));

describe('Test de ajouterProprietaire', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Devrait ajouter un nouveau propriétaire', async () => {
    const nouveauProprietaireMock = { id_utl: 1  };
    Proprietaire.create.mockResolvedValue(nouveauProprietaireMock);
  
    console.log = jest.fn();
  
    await ajouterProprietaire(1);
  
    expect(Proprietaire.create).toHaveBeenCalledWith({ id_utl: 1 });
    expect(console.log).toHaveBeenCalledWith('Nouveau propriétaire ajouté:', nouveauProprietaireMock);
  });
  

  it('Devrait afficher une erreur en cas de problème', async () => {
    const erreur = new Error('Erreur lors de l\'ajout du propriétaire');
    Proprietaire.create.mockRejectedValue(erreur);

    console.error = jest.fn();

    await ajouterProprietaire(1);

    expect(console.error).toHaveBeenCalledWith('Erreur lors de l\'ajout du propriétaire:', erreur.message);
  });
});
