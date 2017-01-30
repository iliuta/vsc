"use strict"

var assert = require('assert');

/**
 * vérifier que le nb d'articles de tous les cartons correspond bien avec le nb initial d'articles
 */
function checkArticlesFromPacksAgainstInput(packs, articlesStr) {
    var articles = packs.map(function (pack) {
        return pack.items;
    }).reduce(function (items1, items2) {
        return items1.concat(items2);
    });
    assert.equal(articles.length, articlesStr.length);
}

/**
 * A partir d'une chaine d'articles, crée les cartons et vérifie le tout contre un résultat attendu et un nb de cartons attendu.
 */
function packAndCheckResults(articlesStr, expectedPackStr, packNb) {
    var xspeedit = require('../lib/xspeedit')(articlesStr);
    var packs = xspeedit.pack();
    assert.equal(packs.length, packNb);
    checkArticlesFromPacksAgainstInput(packs, articlesStr);
    assert.equal(packs.join('/'), expectedPackStr);
}



describe('Xspeedit', function () {
    it('should throw error when created with empty input', function () {
        try {
            var xspeedit = require('../lib/xspeedit')('');
        } catch (e) {
            assert.equal(e.message, 'Il faut au moins un article.');
            return;
        }
        assert.ok(false, 'Exception required');
    });
    it('should throw error when created with characters instead of digits', function () {
        try {
            var xspeedit = require('../lib/xspeedit')('1634abcd5z2');
        } catch (e) {
            assert.equal(e.message, 'Seulement des chiffres en entrée.');
            return;
        }
        assert.ok(false, 'Exception required');
    });
    it('should return 8 packs instead of 10', function () {
        packAndCheckResults('163841689525773', '91/82/81/73/73/64/6/55', 8);
        //old: 163/8/41/6/8/9/52/5/7/73
    });
    it('should return 10 packs instead of 12', function () {
        packAndCheckResults('123456789774125566', '91/82/73/721/7/64/64/6/55/5', 10);
        //old: 1234/5/6/7/9/9/7/7/412/55/6/6
    });
    it('should return also 2 packs', function () {
        packAndCheckResults('11111111119', '91/111111111', 2);
        //old: 1111111111/9
    });
    it('should return 3 packs instead of 4', function () {
        packAndCheckResults('9911118', '91/91/811', 3);
        //old: 9/91/111/8
    });
});
