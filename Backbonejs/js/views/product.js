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
            _.bindAll(this, "addedToCart");
            aggregator.bind("cart:productAdded", this.addedToCart);
            this.listenTo(this.model, "change", this.render);
        },

        render: function () {
            var item = this.model.toJSON();

            this.$el
                .html(this.template(item))
                .toggleClass("warning", item.itemsInStock > 0 && item.itemsInStock < 5)
                .toggleClass("danger", item.itemsInStock < 1);

            return this;
        },

        addToCart: function () {
            aggregator.trigger("product:addToCart", this.model);
        },

        addedToCart: function (item) {
            if (item.id == this.model.id) {
                this.model.fetch();
            }
        }
    });

    return masterView;
});