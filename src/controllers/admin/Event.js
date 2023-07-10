const { events, sequelize } = require( '../../models' )

module.exports = {
    index: async ( req, res ) => {
        const rowsLength = ( await events.findAll() ).length;
        let pages = 0;
        let pnum = parseInt( req.params.pnum );
        if ( isNaN( pnum ) ) {
            pnum = 1;
        }
        pages = 5 * ( pnum - 1 );
        const [model] = await sequelize
            .query( `SELECT e.id, e.title, e.ticketPrice, concat(s.firstName,' ', s.lastName) as speakerName, t.name as topicName
             FROM events e left join speakers s on s.id = e.speakerId
                           left join topics t on e.topicId = t.id ORDER BY ID LIMIT ${pages}, ${5}` );
        res.render( 'events', { layout: 'admin-layout', model, rowsLength, pnum } )
    },
    details: async ( req, res ) => {
        const event = await events.findByPk( req.params.id );
        res.send( event )
    },
    create: async ( req, res ) => {
        console.log( req.body );
        const event = await events.create( req.body );
        res.redirect( '/event' );
    },
    update: async ( req, res ) => {
        const [affectedRows] = await events.update( req.body, { where: { id: req.params.id } } );
        res.redirect( '/event' );
        // res.send( { affectedRows } );
    },
    delete: async ( req, res ) => {
        const affectedRows = await events.destroy( { where: { id: req.params.id } } );
        res.redirect( '/event' );
        // res.send( { affectedRows } )
    },
    renderCreatePage: async ( req, res ) => {
        const [speakers] = await sequelize
            .query( `SELECT id, concat(firstName,' ', lastName) as name FROM speakers;` );
        const [topics] = await sequelize
            .query( `SELECT id, name FROM topics;` );
        res.render( 'createEvent', { layout: 'admin-layout', speakers, topics } )
    },
    renderEditPage: async ( req, res ) => {
        // const model = await events.findByPk( req.params.id );
        const model = await sequelize
            .query( `SELECT e.*, concat(s.firstName,' ', s.lastName) as speakerName, t.name as topicName, s.job as speakerJob 
            FROM events e left join speakers s on s.id = e.speakerId
                          left join topics t on e.topicId = t.id where e.id = ${req.params.id}`, { plain: true } ); 
        console.log(model);

        const [speakers] = await sequelize
            .query( `SELECT id, concat(firstName,' ', lastName) as name FROM speakers;` );
        const [topics] = await sequelize
            .query( `SELECT id, name FROM topics;` );

        res.render( 'editEvent', { layout: 'admin-layout', model, speakers, topics } )
    }
}