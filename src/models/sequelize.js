const dbConfig = require( '../config/dbConfig' );
const { Sequelize } = require( 'sequelize' );
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        define: {
            timestamps: false,
        },
        // logging: false,
    }

);
// sequelize.sync({alter: true});
// sequelize.authenticate()
//     .then( () => {
//         console.log( 'connected ..' );
//     } )
//     .catch( ( err ) => {
//         console.log( err.message );
//     } );

module.exports = sequelize;
