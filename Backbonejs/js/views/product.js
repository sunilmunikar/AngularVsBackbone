define([
        "jquery",
        "underscore",
        "backbone",
        "models/product",
        "text!templates/product.html"
], function ($, _, backbone, product, template) {
    "use strict";

    var masterView = backbone.View.extend({
        template: _.template(template),
        model: product,
        tagName: "tr",
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

    });

    return masterView;
});