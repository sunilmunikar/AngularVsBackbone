define([
        "jquery",
        "underscore",
        "backbone",
        "models/product",
        "models/cart",
        "text!templates/product.html",
        "aggregator"
], function ($, _, backbone, product, cart, template, aggregator) {
    "use strict";

    var masterView = backbone.View.extend({
        template: _.template(template),
        model: product,
        tagName: "tr",
        
        events: {
            "click .cart-add-button": "addToCart"
        },

        initialize: function () {

        },

        render: function () {
            var item = this.model.toJSON();

            this.$el
                .html(this.template(item))
                .toggleClass("warning", item.itemsInStock > 0 && item.itemsInStock < 5)
                .toggleClass("danger", item.itemsInStock < 1);

            return this;
        },
        
        addToCart: function() {
            aggregator.trigger("product:addToCart", this.model);
        }
    });

    return masterView;
});