"use strict"

/**
 * Structure en arbre binaire de recherche pour stocker la liste d'articles
 * 
 * @param chaine contenant les articles
 */
var ArticlesBTree = function (articlesStr) {
    /**
     * la valeur à stocker dans le noeud
     */
    this.value = null;
    /**
     * l'arbre gauche, valeurs inférieures à value
     */
    this.left = null;
    /**
     * l'arbre droit, valeurs supérieures à value
     */
    this.right = null;

    /**
     * ajouter un article à l'arbre
     */
    this.insert = function (v) {
        if (v < this.value) {
            if (this.left) {
                this.left.insert(v);
            } else {
                this.left = new ArticlesBTree();
                this.left.value = v;
            }
        } else {
            if (this.right) {
                this.right.insert(v);
            } else {
                this.right = new ArticlesBTree();
                this.right.value = v;
            }
        }
    }

    /**
     * Itère dans l'arbre en ordre inverse
     */
    this.forEachReverse = function (callback) {
        if (this.right) {
            this.right.forEachReverse(callback);
        }
        callback(this.value);
        if (this.left) {
            this.left.forEachReverse(callback);
        }
    }

    // crée l'arborescence à partir de la chaîne d'articles
    if (articlesStr) {
        for (var i = 0; i < articlesStr.length; i++) {
            var article = parseInt(articlesStr.charAt(i), 10);
            if (isNaN(article)) {
                throw new Error('Seulement des chiffres en entrée.');
            }
            if (i == 0) {
                this.value = article;
            } else {
                this.insert(article);
            }
        }
    }
}

module.exports = {
    create: function (articlesStr) {
        return new ArticlesBTree(articlesStr);
    }
}