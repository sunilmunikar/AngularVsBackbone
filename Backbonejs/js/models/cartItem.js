define(['relational'],

    function (backbone) {
        'use strict';

        var cartItem = backbone.RelationalModel.extend({
            url: "http://localhost:8765/shoppingcart",
        });

        return cartItem;
    });
