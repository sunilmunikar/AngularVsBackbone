define([
        "underscore",
        "relational",
        "models/cartItem",
        "collections/cartItems",
        "notifier"
    ],
    function (_, backbone, cartItem, cartProductCollection, notifier) {
        "use strict";

        var cartModel = backbone.RelationalModel.extend({
            url: "http://localhost:8765/shoppingcart",
            
            relations: [{
                type: backbone.HasMany,
                key: "items",
                relatedModel: cartItem,
                collectionType: cartProductCollection,
                reverseRelation: {
                    key: 'cart',
                }
            }],
            
            addProduct: function (product) {
                var items = this.get("items");
                var existing = null;

                if (items && items.length > 0) {
                    existing = this.get("items").findWhere({ productId: product.id });
                }

                var onSuccess = _.partial(this.addOnSuccess, product);

                if (!existing) {
                    var item = new cartItem({ productId: product.id, quantity: 1 });
                    item.save(null, { success: onSuccess, error: this.addOnError });
                } else {
                    existing.set("quantity", existing.get("quantity") + 1);
                    existing.save(null, { success: onSuccess, error: this.addOnError });
                }
            },
            
            addOnSuccess: function (product, model) {
                product.fetch();
                notifier.success(product.get("name") + " added to the cart", model.get("productId"));
            },
            
            addOnError: function (model, xhr, options) {

                if (xhr.responseJSON && xhr.responseJSON.message) {
                    notifier.error(xhr.responseJSON.message, model.get("productId"));
                } else {
                    notifier.error("An error has occured while adding the product to the cart", model.get("productId"));
                }
            }
        });

        return new cartModel();
    });