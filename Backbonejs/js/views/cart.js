define([
        "jquery",
        "underscore",
        "backbone",
        "handlebars",
        "models/cart",
        "text!templates/cart.html",
        "views/cartItem",
        "aggregator",
        "notifier"
], function ($, _, backbone, handlebars, cart, cartTemplate, itemView, aggregator, notifier) {
    "use strict";

    var masterView = backbone.View.extend({
        template: handlebars.compile(cartTemplate),
        model: cart,
        initialize: function () {
            _.bindAll(this, "addProduct");
            aggregator.bind("product:addToCart", this.addProduct);
            
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
            var view = new itemView({ model: model });
            $("#cartitemlist").append(view.render().el);

            this.toggle();
        },
        
        addProduct: function (product) {
            var items = this.model.get("items");
            var existing = null;

            if (items && items.length > 0) {
                existing = items.findWhere({ productId: product.id });
            }

            var onSuccess = _.partial(this.addOnSuccess, product);

            if (!existing) {
                items.create({ productId: product.id, quantity: 1, product: product }, { success: onSuccess, error: this.addOnError });
            } else {
                existing.set("quantity", existing.get("quantity") + 1);
                existing.save(null, { success: onSuccess, error: this.addOnError });
            }
        },

        addOnSuccess: function (product, model) {
            aggregator.trigger("cart:productAdded", product);
            notifier.success(product.get("name") + " added to the cart", model.get("productId"));
        },

        addOnError: function (model, xhr, options) {

            if (xhr.responseJSON && xhr.responseJSON.message) {
                notifier.error(xhr.responseJSON.message, model.get("productId"));
            } else {
                notifier.error("An error has occured while adding the product to the cart", model.get("productId"));
            }

            model.fetch();
        }
    });

    return masterView;
});