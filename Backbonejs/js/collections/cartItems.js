define([
        'underscore',
        'backbone',
        'models/product'
],
    /************************************************/
    function (_, backbone, product) {
        var cartItems = backbone.Collection.extend({
            model: product,
        });

        return cartItems;
    });