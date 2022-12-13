# is-ready-tcp

**is-ready-tcp** allows you to easy await and check any tcp service connection

## Installation

```bash
npm i is-ready-tcp
```

## Usage

```javascript
const isReadyTcp = require( 'is-ready-tcp' );
( async () => {
    try {
        await isReadyTcp( 3000 );

        // Success
        // You can connect to your service

    } catch ( error ) {
        // Connection timeout reached
    }
} )();
```

## Parameters

```javascript
isReadyTcp( port: Integer [, host: String = 'localhost' [, timeOutSeconds: Number = 30 [, intervalAttemptsSeconds: Number = 1 ]]] )
```