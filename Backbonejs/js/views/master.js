define([
        "jquery",
        "underscore",
        "backbone",
        "collections/products",
        "views/products",
        "views/cart"
], function ($, _, backbone, products, productsView, cartView) {
    "use strict";

    var masterView = backbone.View.extend({

        el: "#app",

        initialize: function () {
            this.productsView = new productsView();

            this.cartView = new cartView();
        },

        render: function () {
            this.$el.find("#productspane").html(this.productsView.render().el);
            this.$el.find("#cartpane").html(this.cartView.render().el);
        },

    });

    return masterView;
});