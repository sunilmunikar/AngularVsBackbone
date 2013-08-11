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

        //events: {
        //    "click .cart-add-button": "addToCart"
        //},

        initialize: function () {
            this.setModel();
        },
        
        setModel : function() {
            if (products.length == 0) {
                products.once("add", function () {
                    this.setModel();
                    this.render();
                });
            } else {
                this.model = products.get(this.options.productId);
            }
        },

        render: function () {
            if (!this.model) {
                return this;
            }

            var item = this.model.toJSON();

            this.$el
                .html(this.template(item))
                .addClass("list-group-item");
                
            return this;
        }
    });

    return masterView;
});