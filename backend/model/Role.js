//-----------------------------------------------------------
//Model representatnt l'ensemble des donnée d'une place au parking
//-----------------------------------------------------------

module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("role", {
        nom: {
            type: Sequelize.STRING
        },
        code: {
            type: Sequelize.STRING
        }

    });
    
    return Role;
};