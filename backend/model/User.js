//-----------------------------------------------------------
//Model representatnt l'ensemble des donnée d'un utilisateur
//-----------------------------------------------------------

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
    //   id: {
    //     type: Sequelize.INTEGER,
    //     primaryKey: true
    //   },
      nom: {
        type: Sequelize.STRING
      },
      prenom: {
        type: Sequelize.STRING
      },
      numero_telephone: {
        type: Sequelize.STRING
      },
      user_name: {
        type: Sequelize.STRING,
        unique: true
      },
      mot_de_passe: {
        type: Sequelize.STRING
      }
    });
  
    return User;
  };