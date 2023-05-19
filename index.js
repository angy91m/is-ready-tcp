"use strict";
const net = require( 'net' ),
    connect = ( port, host, timeout ) => {
        return new Promise( ( resolve, reject ) => {
            const client = net.connect( { port, host } );
            const to = setTimeout( () => {
                clearTimeout( to );
                client.end();
                reject( new Error( 'Timeout exceeded' ) );
            }, timeout );
            client.on( 'connect', () => {
                clearTimeout( to );
                client.end();
                resolve();
            } );
            client.on( 'error', err => {
                clearTimeout( to );
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
            await connect( port, host, timeOutSeconds * 1000 );
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