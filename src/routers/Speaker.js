const controller = require( "../controllers/admin/Speaker" );
const router = require( "express" ).Router();

router.get( '/details/:id', controller.details );

router.route( '/create' )
    .get( controller.renderCreatePage )
    .post( controller.create )

router.route( '/edit/:id?' )
    .get( controller.renderEditPage )
    .post( controller.update )

router.post( '/delete/:id', controller.delete );

router.get( '/:pnum?', controller.index );

module.exports = router;