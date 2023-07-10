const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const path = require( 'path' );
const multer = require( 'multer' );
const expressLayouts = require( 'express-ejs-layouts' );

const app = express();
const port = 3000;
const db = require( './src/models' );
const { topicRouter } = require( './src/routers' );
const { speakerRouter } = require( './src/routers' );
const { eventRouter } = require( './src/routers' );
const { homeRouter } = require( './src/routers' );
const { userRouter } = require( './src/routers' );

let subdir = ["", "events", "speakers", "topics", "layouts", "home"];
let views = [];
for ( let i = 0; i < subdir.length; i++ ) {
    views.push( `${process.cwd()}/src/views/${subdir[i]}` );
}
app.set( 'views', views )
// set the view engine to ejs
app.set( 'view engine', 'ejs' );

app.use( expressLayouts );
app.set( "layout extractScripts", true )
app.set( 'layout', 'layouts/layout' );

app.use( bodyParser.urlencoded( { extended: true } ) ); // parse application/x-www-form-urlencoded

app.use( bodyParser.json() ); // parse application/json

app.use( multer().array() ); // parse multipart/form-data

app.use( express.static( path.join( process.cwd(), '/src/public/' ) ) );


app.use( '/topic', topicRouter );
app.use( '/speaker', speakerRouter );
app.use( '/event', eventRouter );
app.use( '/user', userRouter );
app.use( '/', homeRouter );

// app.get( '/', ( req, res ) => {
//     // res.sendFile( 'index.html', {
//     //     root: path.join( __dirname, '/src/public' ),
//     // } );
//     res.sendFile( path.join( __dirname, '/src/public/index.html' ) );
// } )

// app.get( '/', ( req, res ) => {

//     res.render( 'event-type' );
//     req.url
// } )

app.get( '/add', ( req, res ) => {

    res.render( 'type-add' );
} )

app.all( '*', ( req, res ) => {
    res.send( "404 Page Note Found" )
} )
app.listen( port, 'localhost', () => {
    console.log( `app is listening at http://localhost:${port}` );
} );


module.exports = app;