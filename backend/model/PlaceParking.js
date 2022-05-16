//-----------------------------------------------------------
//Model representatnt l'ensemble des donnée d'une place au parking
//-----------------------------------------------------------

module.exports = (sequelize, Sequelize) => { 
    const PlaceParking = sequelize.define("place_parking", {
      numero_etage: {
        type: Sequelize.STRING
      },
      disponible: {
        type: Sequelize.BOOLEAN
      },
      numero_place: {
        type: Sequelize.STRING,
        unique: true
      }
  
    });
  
    return PlaceParking;
  };