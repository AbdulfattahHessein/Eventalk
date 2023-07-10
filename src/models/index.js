
let sequelize = require( './sequelize' );
let topics = require( './Topic' );
let speakers = require( './Speaker' );
let events = require( './Event' );
let users = require( './User' );

// db.users.hasMany( db.events, { foreignKey: { name: 'creatorId', allowNull: false } } );

speakers.hasMany( events );

topics.hasMany( events );

users.hasMany( events );

// events.belongsToMany( users);

// db.events.belongsToMany( db.users, { through: db.feedbacks } );

module.exports = {
    sequelize,
    topics,
    speakers,
    events,
    users
}

