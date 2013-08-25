'use strict';

/* Services */

angular.module('shoppingCartApp.services', [])
    .value('version', '0.1')
    .value('baseUrl', 'http://localhost:8765/')
    .factory('Products',
    ['$http', '$q', 'baseUrl', function ($http, $q, baseUrl) {

        var _products = [];

        var _getProducts = function () {

            var deferred = $q.defer();

            $http.get(baseUrl + "products")
                .then(function (result) {
                    //Successful
                    angular.copy(result.data, _products)
                    deferred.resolve();
                },
                function () {
                    //Error
                    deferred.reject();
                });

            return deferred.promise;
        };

        return {
            products: _products,
            getProducts: _getProducts
        };
    }])
    .factory('MyShoppingCart',
    ['$http', '$q', function ($http, $q) {

        var _productsInCart = [{ id: 1, name: "test" }],
            _getProductsInMyCart = function () {
                return _productsInCart;
            },
            _addItemToShoppingCart = function (newItem) {
                var deferred = $q.defer();

                $http.post(baseUrl + "ShoppingCart")
                .then(function (result) {
                    // success
                    var newlyAddedItem = result.data;
                    _productsInCart.splice(0, 0, newlyAddedItem);
                    deferred.resolve(newlyAddedItem);
                },
                function () {
                    //error
                    deferred.reject();
                });
                return deferred.promise;
            },
            _removeItemFromMyCart = function (productToRemove) {
                _.find(_productsInCart, { 'id': productToRemove.id });
            },
            _clearMyCart = function () {
                _productsInCart.length = 0;
            };

        return {
            productsInMyCart: _productsInCart,
            removeItemFromMyCart: _removeItemFromMyCart,
            clearMyCart: _clearMyCart,
            addItemToShoppingCart: _addItemToShoppingCart
        };
    }]);