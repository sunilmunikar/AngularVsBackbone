/// <reference path="../lib/angular/angular.js" />
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
    .factory('MyShoppingBasket',
    ['$http', '$q', 'baseUrl', function ($http, $q, baseUrl) {

        var _productsInCart = [{ id: 1, name: "test" }],
            _getProductsInMyCart = function () {
                return _productsInCart;
            },
            _addItemToShoppingCart = function (newItem) {
                var deferred = $q.defer();

                $http.post(baseUrl + "ShoppingCart", {ProductId: newItem.id, Quantity:1})
                .then(function (result) {
                    // success
                    _productsInCart.splice(0, 0, newItem);
                    deferred.resolve(newItem);
                },
                function (data, status) {
                    //error
                    console.log(data);
                    console.log(status);
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