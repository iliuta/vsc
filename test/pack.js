"use strict"

var assert = require('assert');

describe('Pack', function () {
    it('should update remaining size', function () {
        var pack = require('../lib/pack').create();
        pack.push(3);
        assert(pack.remainingSize, 7);
        pack.push(2);
        assert(pack.remainingSize, 5);
        pack.push(6);
        assert(pack.remainingSize, -1);
    });
});