const { ajouterMessage, afficherMessages } = require('../../api/Message');
const Message = require('../../models/Message');

jest.mock('../../models/Message', () => ({
  findOne: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
}));

describe('Test des fonctions de message', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Test de ajouterMessage', () => {
    it('Devrait ajouter un nouveau message', async () => {
      const nouveauMessageMock = { id_msg: 1, txt_msg: 'Bonjour', id_utl: 1, id_utl_1: 2 };
      Message.create.mockResolvedValue(nouveauMessageMock);
  
      console.log = jest.fn();
  
      await ajouterMessage('Bonjour', 1, 2);
  
      expect(Message.create).toHaveBeenCalledWith({ txt_msg: 'Bonjour', id_utl: 1, id_utl_1: 2 });
      expect(console.log).toHaveBeenCalledWith('Nouveau message ajouté:', nouveauMessageMock);
    });
  
    it('Devrait afficher une erreur en cas de problème', async () => {
      const erreur = new Error('Erreur lors de l\'ajout du message');
      Message.create.mockRejectedValue(erreur);
  
      console.error = jest.fn();
  
      await ajouterMessage('Bonjour', 1, 2);
  
      expect(console.error).toHaveBeenCalledWith('Erreur lors de l\'ajout du message:', erreur.message);
    });
  });
  

  describe('Test de afficherMessages', () => {
    it('Devrait retourner les messages pour les utilisateurs donnés', async () => {
      const messagesMock = [{ id_msg: 1, txt_msg: 'Bonjour', id_utl: 1, id_utl_1: 2 }];
      Message.findAll.mockResolvedValue(messagesMock);

      console.log = jest.fn();

      const resultat = await afficherMessages(1, 2);

      expect(resultat).toEqual(messagesMock);
      expect(Message.findAll).toHaveBeenCalledWith({ 
        where: { id_utl: 1, id_utl_1: 2 },
        order: [['dat_msg', 'ASC']],
      });
      expect(console.log).toHaveBeenCalledWith("messages trouvés");
    });

    it('Devrait afficher une erreur en cas de problème', async () => {
      const erreur = new Error('Erreur lors de la récupération des messages');
      Message.findAll.mockRejectedValue(erreur);

      console.error = jest.fn();

      await afficherMessages(1, 2);

      expect(console.error).toHaveBeenCalledWith('Erreur lors de la récupération des messages:', erreur.message);
    });
  });
});
