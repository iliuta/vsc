"use strict"

var assert = require('assert');

describe('ArticlesBTree', function () {
    it('should throw error when created with characters instead of digits', function () {
        try {
            var articlesStr = '1638416ze89525773';
            require('../lib/articles').create(articlesStr);
        } catch (e) {
            assert.equal(e.message, 'Seulement des chiffres en entrée.');
        }
    });
    

    it('should insert correctly', function () {
        var tree = require('../lib/articles').create('5');
        tree.insert(2);
        assert.equal(tree.left.value, 2);
        tree.insert(7);
        assert.equal(tree.right.value, 7);
        tree.insert(6);
        assert.equal(tree.right.left.value, 6);
        tree.insert(3);
        assert.equal(tree.left.right.value, 3);
    });

    it('should sort correctly', function () {
        var articlesStr = '163841689525773';
        var tree = require('../lib/articles').create(articlesStr);
        var articles = [];
        tree.forEachReverse(function(article){
            articles.push(article);
        });
        assert.equal(articles.join(''), '988776655433211');
    });

});