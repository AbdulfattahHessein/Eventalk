const { DataTypes } = require( "sequelize" );
const  sequelize  = require( "./sequelize" );

const Topic = sequelize.define( 'topic', {
    name: {
        type: DataTypes.STRING( 50 ),
        allowNull: false,
    }
} );

module.exports = Topic;
