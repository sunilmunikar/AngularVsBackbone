'use strict';

/* Services */

angular.module('shoppingCartApp.services', [])
    .value('version', '0.1')
    .factory('Product', [function () {
        var product = { name: 'product1' };

        return product;
    }])
    .factory('ShoppingCart', [function () {

        var productList = [];

        var shoppingCart = {
            getProductList: function () {
                return productList;
            }
        };
        return shoppingCart;
    }]);
