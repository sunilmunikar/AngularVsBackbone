define([
        "jquery",
        "underscore",
        "backbone",
        "text!templates/products.html",
        "collections/products",
        "views/product"
], function ($, _, backbone, productsTemplate, products, productView) {
    "use strict";

    var masterView = backbone.View.extend({
        template: _.template(productsTemplate),
        
        initialize: function () {
            this.listenTo(products, "add", this.addProduct);

            products.fetch();
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