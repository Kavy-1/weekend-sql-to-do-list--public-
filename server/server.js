// requires
const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
const pg = require( 'pg' );

// uses
app.use( express.static( 'server/public' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );

// globals
const port = 3000;
const Pool = pg.Pool;
const pool = new Pool( {
    database: 'to-do-app',
    host: 'localhost',
    port: 5432,
    max: 12,
    idleTimeoutMillis: 30000
} );

// listen
app.listen( port, () => {
    console.log( 'listen on port', port );
} );

// POST
app.post( '/tasks', ( req, res ) => {
    console.log( 'in app.post, req.body:', req.body );
    const queryString = `INSERT INTO "to-do" ( task, urgency, status ) VALUES ( $1, $2, $3 );`;
    pool.query( queryString, [ req.body.task, req.body.urgency, req.body.status ] ).then( ( results ) => {
        res.sendStatus( 201 );
    } ).catch( ( err ) => {
        console.log( err );
        res.sendStatus( 500 );
    } ); // end query
} ); // end POST

// GET
app.get( '/tasks', ( req, res ) => {
    console.log( 'in app.get' );
    const queryString = 'SELECT * FROM "to-do";';
    pool.query( queryString ).then( ( results ) => {
        res.send( results.rows );
    } ).catch( ( err ) => {
        console.log( 'error in app.get:', err );
        res.sendStatus( 500 );
    } ); // end query
} ); // end GET

// GET  (singular item )
app.get( '/tasks/:id', ( req, res ) => {
    let taskId = req.params.id;
    console.log( 'in app.get taskId,', taskId );
    let queryString = 'SELECT * FROM "to-do" WHERE "id" = $1;';
    pool.query( queryString, [ taskId ] ).then( ( results ) => {
        res.send( results.rows );
    } ).catch( ( err ) => {
        console.log( 'error in app.get singular item:', err );
        res.sendStatus( 500 );
    } ) // end query
} ); // end GET

// PUT
app.put( '/tasks/:id', ( req, res ) => {
    console.log( 'in app.put, req.params.id:', req.params.id, ' and req.body:', req.body );
    let queryString = '';
    if( req.body.status === 'Incomplete' ){
        queryString = 'UPDATE "to-do" SET "status" = \'Complete\' WHERE "id" = $1;';
    } // end if
    else{
        console.log( 'somethings wrong in app.put conditional' );
    } // end else
    pool.query( queryString, [ req.params.id ] ).then( ( results ) => {
        console.log( 'successful status change:', results );
        res.sendStatus( 200 );
    } ).catch( ( err ) => {
        console.log( 'error in app.put:', err );
        res.sendStatus( 500 );
    } ); // end query
} ); // end PUT

// DELETE
app.delete( '/tasks/:id', ( req, res ) => {
    const queryString = 'DELETE FROM "to-do" WHERE "id" = $1;';
    let taskId = req.params.id;
    console.log( 'in app.delete, deleting:', taskId );
    pool.query( queryString, [ taskId ] ).then( ( results ) => {
        console.log( 'successful deletion' );
        res.sendStatus( 200 );
    } ).catch( ( err ) => {
        console.log( 'error in app.deleteL', err );
        res.sendStatus( 500 );
    } ); // end ajax DELETE
} ); // end DELETE