"use strict"

if (process.argv.length != 3) {
    console.log('Utilisation: node index.js <articles>');
    process.exit(1);
}

var xspeedIt = require('./lib/xspeedit')(process.argv[2]);

var packs = xspeedIt.pack();

console.log(`${packs.join('/')} => ${packs.length} cartons utilisés`);

