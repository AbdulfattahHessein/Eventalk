const dbConfig = require("../config/dbConfig");
const { Sequelize } = require("sequelize");
const mysql2 = require("mysql2"); // Needed to fix sequelize issues with WebPack

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectModule: mysql2, // Needed to fix sequelize issues with WebPack
  define: {
    timestamps: false,
  },
  logging: false,
});
// sequelize.sync({alter: true});
// sequelize.authenticate()
//     .then( () => {
//         console.log( 'connected ..' );
//     } )
//     .catch( ( err ) => {
//         console.log( err.message );
//     } );

module.exports = sequelize;
