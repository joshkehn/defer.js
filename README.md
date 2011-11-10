# DeferJS

Provides an easy deferment pattern for evented systems.

## TODO's

1. Testing
2. More testing
3. Allow arguments from the event

## Usage

The include pattern differs slightly from the client to the browser.

    // Node.js
    var Defer = require('deferjs').Defer;

    // Browser
    <script type="text/javascript" src="defer.js"></script>

Actual usage is fairly straight-forward.

    var def = new Defer();

    process.on('event', def.trigger);

    def.defer(function () {
    console.log('Event happened.');
    });

    def.defer(function () {
        setTimeout(function () {
            console.log('This does not block.');
        }, 1500);
    });

### About

Written by [Joshua Kehn](http://joshuakehn.com/).
