define([
        "jquery",
        "underscore",
        "backbone",
        "text!templates/products.html",
        "collections/products",
        "views/product",
        "models/cart"
], function ($, _, backbone, productsTemplate, products, productView, cart) {
    "use strict";

    var masterView = backbone.View.extend({
        template: _.template(productsTemplate),
        model: products,
        initialize: function () {
            this.listenTo(products, "add", this.addProduct);
            this.model.fetch();
        },

        render: function () {
            this.$el.html(this.template());
            
            return this;
        },
        
        addProduct: function(model) {
            var view = new productView({ model: model });
            $("#productslist").append(view.render().el);
        }

    });

    return masterView;
});