require( "dotenv" ).config();
module.exports = {
    HOST: process.env.MYSQL_HOSTNAME,
    USER: process.env.MYSQL_USERNAME,
    PASSWORD: process.env.MYSQL_PASSWORD,
    DB: process.env.MYSQL_DBNAME,
    dialect: 'mysql'
};
