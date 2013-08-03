define([
        'underscore',
        'backbone',
        'models/product'
],
    /************************************************/
    function (_, backbone, product) {
        var productCollection = backbone.Collection.extend({
            model: product,
            url: "http://localhost:8765/products"
        });

        return new productCollection();
    });