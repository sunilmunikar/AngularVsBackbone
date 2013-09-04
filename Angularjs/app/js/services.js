/// <reference path="../lib/angular/angular.js" />
'use strict';

/* Services */

angular.module('shoppingCartApp.services', [])
    .value('version', '0.1')
    .constant('baseUrl', 'http://localhost:8765/')
    .factory('Products',
    ['$http', '$q', '$rootScope', 'baseUrl', function ($http, $q, $rootScope, baseUrl) {
        var _products = [];

        var _getProducts = function () {

            var deferred = $q.defer();

            $http.get(baseUrl + "products").then(function (result) {
                angular.copy(result.data, _products)
                deferred.resolve();
            },
                function () {
                    deferred.reject();
                });
            return deferred.promise;

            //$http.get(baseUrl + "products").success(function (data) {
            //    angular.copy(data, _products);
            //    deferred.resolve(data);
            //}).error(function () {
            //    deferred.reject();
            //});
            //return deferred.promise;
        };
        var _setProducts = function () {
            _products = [];
        }
        return {
            products: _products,
            setProducts: _setProducts,
            getProducts: _getProducts
        };
    }])
    .factory('MyShoppingBasket',
    ['$http', '$q', 'baseUrl', 'Products', '$rootScope', function ($http, $q, baseUrl, Products, $rootScope) {
        var _myCart = { products: [], isFinish: false, deliveryAddress: "" },
            _productsInCart = {},
            _getProductsInMyCart = function () {
                var deferred = $q.defer();

                $http.get(baseUrl + "ShoppingCart").then(function (result) {
                    angular.copy(result.data, _productsInCart);
                    //console.log(_productsInCart);

                    $http.get(baseUrl + "products").then(function (result) {
                        var products = result.data;
                        angular.forEach(_productsInCart.items, function (basketItem) {
                            basketItem.product = {};
                            angular.forEach(products, function (product) {
                                if (basketItem.productId == product.id) {
                                    basketItem.product = product;
                                }
                            });
                        });
                    });
                    deferred.resolve(_productsInCart);
                    //}).error(function () {
                    //    deferred.reject();
                });
                return deferred.promise;
            },
            _addItemToShoppingCart = function (newItem) {
                $rootScope.$broadcast('productModel::productAdded', newItem);

                var deferred = $q.defer();
                var existingProduct = _findProductInCart(newItem);
                if (existingProduct !== undefined) {
                    //put
                    $http.put(baseUrl + "ShoppingCart",
                        {
                            Id: existingProduct.id,
                            ProductId: existingProduct.productId,
                            Quantity: existingProduct.quantity + 1
                        })
                        .then(function (result) {
                            // update the item here
                            existingProduct.quantity = existingProduct.quantity + 1;

                            angular.forEach(Products.products, function (product) {
                                if (newItem.id == product.id) {
                                    product.itemsInStock = product.itemsInStock - 1;
                                    newItem.product = product;
                                }
                            });

                            deferred.resolve(newItem);
                        },
                        function (reason) {
                            deferred.reject(reason);
                        });
                }
                else {
                    //post
                    $http.post(baseUrl + "ShoppingCart", { ProductId: newItem.id, Quantity: 1 })
                        .then(function (result) {
                            angular.forEach(Products.products, function (product) {
                                if (newItem.id == product.id) {
                                    product.itemsInStock = product.itemsInStock - 1;
                                    newItem.product = product;
                                }
                            });
                            _productsInCart.items.splice(0, 0, newItem);
                            deferred.resolve(newItem);
                        },
                        function (reason) {
                            deferred.reject(reason);
                        });
                }

                return deferred.promise;
            },
            _removeItemFromMyCart = function (productToRemove) {
                _.find(_productsInCart, { 'id': productToRemove.id });
            },
            _clearMyCart = function () {
                _productsInCart.length = 0;
            };

        var _findProductInCart = function (lookFor) {
            return _.find(_productsInCart.items, { 'productId': lookFor.id });
        };

        return {
            getProductsInMyCart: _getProductsInMyCart,
            productsInMyCart: _productsInCart,
            removeItemFromMyCart: _removeItemFromMyCart,
            clearMyCart: _clearMyCart,
            addItemToShoppingCart: _addItemToShoppingCart
        };
    }]);