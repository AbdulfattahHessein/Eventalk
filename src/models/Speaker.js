const { DataTypes } = require( "sequelize" );
const sequelize = require( "./sequelize" );



const Speaker = sequelize.define( 'speaker', {
    firstName: {
        type: DataTypes.STRING( 50 ),
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING( 50 ),
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        validate: {
            isNumeric: true
        }
    },
    gender: {
        type: DataTypes.ENUM( 'Male', 'Female' ),
    },
    country: {
        type: DataTypes.STRING( 30 )
    },
    city: {
        type: DataTypes.STRING( 30 )
    },
    job: {
        type: DataTypes.STRING( 50 ),
        // allowNull: false,
    },
    image: {
        type: DataTypes.STRING( 50 ),
        allowNull: true
    },
    facebook: {
        type: DataTypes.STRING,
        validate: {
            isUrl: true
        }
    },
    linkedin: {
        type: DataTypes.STRING,
        validate: {
            isUrl: true
        }
    }
} );

module.exports = Speaker;