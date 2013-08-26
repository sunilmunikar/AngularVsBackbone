define([
        "jquery",
        "underscore",
        "backbone",
        "handlebars",
        "collections/products",
        "text!templates/cartItem.html"
], function ($, _, backbone, handlebars, products, template) {
    "use strict";

    var masterView = backbone.View.extend({
        template: handlebars.compile(template),
        tagName: "li",

        initialize: function () {
            if (!this.product) {
                this.extendWithProduct();
            }
        },
        
        extendWithProduct: function () {
            if (products.length == 0) {
                products.once("add", function () {
                    this.extendWithProduct();
                    this.render();
                }, this);
            } else {
                this.product = products.get(this.model.get("productId"));
            }
        },

        render: function () {
            var data = this.model.toJSON();
            
            if (this.product) {
                _.extend(data, this.product.toJSON());
            }

            this.$el
                .html(this.template(data))
                .addClass("list-group-item");
                
            return this;
        }
    });

    return masterView;
});