// -----------------------------------------------------------
// Paramètre de base des données"
// -----------------------------------------------------------

const dbname = "gestion_parking_db";
const dbpass = "";
const dbuser = "root";
const TOKEN_KEY = "TOKEN_KEY"

module.exports = {
    TOKEN_KEY: TOKEN_KEY,
    HOST: "localhost",
    USER: dbuser,
    PASSWORD: dbpass,
    DB: dbname,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};