define([
        "jquery",
        "underscore",
        "backbone",
        "handlebars",
        "text!templates/cart.html"
], function ($, _, backbone, handlebars, cartTemplate) {
    "use strict";

    var masterView = backbone.View.extend({
        initialize: function () {

        },

        render: function () {
            this.$el.html(handlebars.compile(cartTemplate));
            return this;
        },

    });

    return masterView;
});