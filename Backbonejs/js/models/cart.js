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
            }]
        });

        return new cartModel();
    });