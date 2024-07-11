const Role = require('./models/Role');

async function ajouterRole(roleName) {
  try {
    const roleExist = await Role.findOne({ where: { role_name: roleName } });
    if (roleExist) {
      throw new Error('Le rôle existe déjà.');
    }

    const newRole = await Role.create({ role_name: roleName });
    console.log('Role ajouté avec succès:', newRole);
    return newRole;
  } catch (error) {
    console.error('Erreur lors de l\'ajout du rôle:', error);
    throw error;
  }
}

module.exports = { ajouterRole };
