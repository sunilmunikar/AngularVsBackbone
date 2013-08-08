define([
        "underscore",
        "relational",
        "models/cartItem",
        "collections/cartItems"
    ],
    function (_, backbone, cartItem, cartProductCollection) {
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

                if (!existing) {
                    var item = new cartItem({ productId: product.id, quantity: 1 });
                    item.save();
                } else {
                    existing.set("quantity", existing.get("quantity") + 1);
                    existing.save();
                }
                
            }
        });

        return new cartModel();
    });