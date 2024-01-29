const axios = require('axios');

// Exemple de requête pour vérifier un utilisateur
axios.post('http://localhost:3000/api/utilisateurs/verifier', {
    pseudo: 'johndoe',
    motdepasse: 'motdepasse'
})
.then(response => {
    console.log(response.data.message);
})
.catch(error => {
    console.error('Erreur:', error.response.data.message);
});