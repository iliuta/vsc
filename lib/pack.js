"use strict"

/**
 * Carton: contient des items, chacun son poids. Poids maximum du pack: 10.
 */
var Pack = function () {
    /**
     * Liste d'items du pack
     */
    this.items = [];
    /**
     * Poids restant. Initialement 10.
     */
    this.remainingSize = 10;
    /**
     * Ajout d'un item dans le pack. Maj du poids restant.
     */
    this.push = function (size) {
        this.items.push(size);
        this.remainingSize -= size;
    }
}

/**
 * Permet d'afficher proprement le pack.
 */
Pack.prototype.toString = function () {
    return this.items.join('');
}

module.exports = {
    create: function () {
        return new Pack();
    }
}