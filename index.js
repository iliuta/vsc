"use strict"

if (process.argv.length != 3) {
    console.log('Utilisation: node index.js <articles>');
    process.exit(1);
}

var articlesStr = process.argv[2];

require('./lib/xspeedit')(articlesStr,
    function (xspeedIt) {
        xspeedIt.pack(function (packs) {
            console.log(`${packs.join('/')} => ${packs.length} cartons utilisés`);
        });
    },
    function (err) {
        console.log(err.message);
    });



