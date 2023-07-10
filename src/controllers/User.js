const db = require( '../models' )
const jwt = require( 'jsonwebtoken' );

module.exports = {

    renderSignup: async ( req, res ) => {
        res.render( 'register', { layout: false } )
    },
    signup: async ( req, res ) => {
        const user = await db.users.create( req.body );
        const token = jwt.sign( { userId: user.dataValues.id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "90d"
        } );
        res.redirect( '/user/login' )
    },
    renderLogin: async ( req, res ) => {
        res.render( 'login', { layout: false } )
    }


}
