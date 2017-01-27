"use strict"

/**
 * Moteur de packaging d'XspeedIt. Créé à partir d'une chaîne d'articles.
 */
var XspeedIt = function (articlesStr) {

    // Tableau avec les cartons (Pack). Initialement vide.
    var packs = [];

    //Initialisation du tableau des articles, à partir de l'entrée.
    if (articlesStr.length == 0) {
        throw new Error('Il faut au moins un article.');
    }

    // Les articles
    var articles = require('./articles').create(articlesStr);

    // Trouver un carton où on peut placer un article d'une certaine taille.
    // Si aucun disponible, alors créer un nouveau.
    function findPack(size) {
        var pack = packs.find(function (currentPack) {
            return currentPack.remainingSize >= size;
        });
        if (!pack) {
            pack = require('./pack').create();
            packs.push(pack);
        }
        return pack;
    }

    /**
     * Mettre les articles dans leurs cartons
     * @return le tableau de Pack
     */
    this.pack = function () {
        articles.forEach(function (article) {
            var pack = findPack(article);
            pack.push(article);
        });
        return packs;
    }

}

module.exports = function (articles) {
    return new XspeedIt(articles);
}
