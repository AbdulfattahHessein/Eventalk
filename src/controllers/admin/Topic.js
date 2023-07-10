const { topics, sequelize } = require( '../../models' )

module.exports = {
    index: async ( req, res ) => {
        const rowsLength = ( await topics.findAll() ).length;
        let pages = 0;
        let pnum = parseInt( req.params.pnum );
        if ( isNaN( pnum ) ) {
            pnum = 1;
        }
        pages = 5 * ( pnum - 1 )
        const [model] = await sequelize
            .query( `SELECT * FROM topics ORDER BY ID LIMIT ${pages}, ${5}` );;
        res.render( 'topics', { layout: 'admin-layout', model, rowsLength, pnum } )
    },
    details: async ( req, res ) => {
        const topic = await topics.findByPk( req.params.id );
        res.send( topic )
    },
    create: async ( req, res ) => {
        console.log( req.body );
        const topic = await topics.create( req.body );
        res.redirect( '/topic' );
    },
    update: async ( req, res ) => {
        const [affectedRows] = await topics.update( req.body, { where: { id: req.params.id } } );
        res.redirect( '/topic' );
        // res.send( { affectedRows } );
    },
    delete: async ( req, res ) => {
        const affectedRows = await topics.destroy( { where: { id: req.params.id } } );
        res.redirect( '/topic' );
        // res.send( { affectedRows } )
    },
    renderCreatePage: ( req, res ) => {
        res.render( 'createTopic', { layout: 'admin-layout' } )
    },
    renderEditPage: async ( req, res ) => {
        const topic = await topics.findByPk( req.params.id );
        res.render( 'editTopic', { layout: 'admin-layout', topic } )
    }
}