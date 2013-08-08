define([
        "jquery",
        "underscore",
        "backbone",
        "handlebars",
        "models/cart",
        "text!templates/cart.html",
        "views/cartItem"
], function ($, _, backbone, handlebars, cart, cartTemplate, itemView) {
    "use strict";

    var masterView = backbone.View.extend({
        template: handlebars.compile(cartTemplate),
        model: cart,
        initialize: function () {
            this.listenTo(this.model, "change", this.render);
            this.listenTo(this.model, "add:items", this.addItem);

            this.model.fetch();
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        
        toggle: function () {
            var hasItems = this.model.get("items").length > 0;
            $("#emptyCart").toggle(!hasItems);
            $("#cartContent").toggle(hasItems);
        },
        
        addItem: function (model) {
            var view = new itemView({ productId: model.get("productId") });
            $("#cartitemlist").append(view.render().el);

            this.toggle();
        }
    });

    return masterView;
});