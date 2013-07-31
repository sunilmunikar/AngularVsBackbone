﻿define([
        "jquery",
        "underscore",
        "backbone",
], function ($, _, backbone) {
    "use strict";

    var masterView = backbone.View.extend({
        initialize: function () {

        },

        render: function () {
            this.$el.html("<h2>Cart</h2>");
            return this;
        },

    });

    return masterView;
});