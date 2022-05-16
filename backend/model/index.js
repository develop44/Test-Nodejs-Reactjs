//-----------------------------------------------------------
//Initialiser sequelize
//-----------------------------------------------------------

const dbConfig = require("../config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//-------------------------------------------------------------------------------------
//initialissation des entité 
db.place_parking = require("./PlaceParking")(sequelize, Sequelize);
db.role = require("./Role")(sequelize, Sequelize);
db.user = require("./User")(sequelize, Sequelize);

//-------------------------------------------------------------------------------------
// Relation entre les entités  (un user a un role et un user a une place au parking) 
db.role.hasMany(db.user);
db.user.belongsTo(db.role);

db.user.hasOne(db.place_parking);
db.place_parking.belongsTo(db.user);




module.exports = db;