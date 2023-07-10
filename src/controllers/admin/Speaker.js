const { speakers, sequelize } = require( '../../models' )

module.exports = {
    index: async ( req, res ) => {
        const rowsLength = ( await speakers.findAll() ).length;
        let pages = 0;
        let pnum = parseInt( req.params.pnum );
        if ( isNaN( pnum ) ) {
            pnum = 1;
        }
        pages = 5 * ( pnum - 1 )
        const [model] = await sequelize
            .query( `SELECT * FROM speakers ORDER BY ID LIMIT ${pages}, ${5}` );;
        res.render( 'speakers', {layout:'admin-layout', model, rowsLength, pnum } )
    },
    details: async ( req, res ) => {
        const speaker = await speakers.findByPk( req.params.id );
        res.send( speaker )
    },
    create: async ( req, res ) => {
        console.log( req.body );
        const speaker = await speakers.create( req.body );
        res.redirect( '/speaker' );
    },
    update: async ( req, res ) => {
        const [affectedRows] = await speakers.update( req.body, { where: { id: req.params.id } } );
        res.redirect( '/speaker' );
        // res.send( { affectedRows } );
    },
    delete: async ( req, res ) => {
        const affectedRows = await speakers.destroy( { where: { id: req.params.id } } );
        res.redirect( '/speaker' );
        // res.send( { affectedRows } )
    },
    renderCreatePage: ( req, res ) => {
        res.render( 'createSpeaker', { layout: 'admin-layout' } )
    },
    renderEditPage: async ( req, res ) => {
        const model = await speakers.findByPk( req.params.id );
        res.render( 'editspeaker', { layout: 'admin-layout',  model } )
    }
}