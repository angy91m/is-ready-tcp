"use strict";
const net = require( 'net' ),
    connect = ( port, host ) => {
        return new Promise( ( resolve, reject ) => {
            const client = net.connect( { port, host } );
            client.on( 'connect', () => {
                client.end();
                resolve();
            } );
            client.on( 'error', err => {
                client.end();
                reject( err );
            } );
        } );
    };
const isReadyTcp = async ( port, host = 'localhost', timeOutSeconds = 30, intervalAttemptsSeconds = 1 ) => {
    let expired = false, connected = false;
    const timeout = setTimeout( () => { expired = true }, timeOutSeconds * 1000 );
    while ( !expired ) {
        try {
            await connect( port, host );
            connected = true;
            break;
        } catch ( err ) {
            await new Promise( r => setTimeout( r, intervalAttemptsSeconds * 1000 ) );
        }
    }
    clearTimeout( timeout );
    if ( connected ) return;
    throw new Error( 'Timeout exceeded' );
};
module.exports = isReadyTcp;