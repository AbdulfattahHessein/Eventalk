const controller = require( "../controllers/User" );
const router = require( "express" ).Router();


router.route( '/signup' )
    .get( controller.renderSignup )
    .post( controller.signup )

router.route( '/login' )
    .get( controller.renderLogin )
    .post( controller.login )
router.route("/logout").get(controller.logout);

module.exports = router;