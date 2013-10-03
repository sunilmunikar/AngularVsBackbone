/// <reference path="../lib/angular/angular.js" />
'use strict';

angular.module('shoppingCartApp.services', [])
    .value('version', '0.1')
    .constant('baseUrl', 'http://localhost:8765/')
    .factory('Products',
    ['$http', '$q', '$rootScope', 'baseUrl', function ($http, $q, $rootScope, baseUrl) {
        var _products = [];

        var _getProducts = function () {
            var deferred = $q.defer();

            $http.get(baseUrl + "products").then(
                function (result) {
                    angular.copy(result.data, _products);
                    deferred.resolve();
                },
                function () {
                    deferred.reject();
                });
            return deferred.promise;
        };

        var _setProducts = function () {
            _products = [];
        };

        return {
            products: _products,
            setProducts: _setProducts,
            getProducts: _getProducts
        };
    }])
    .factory('MyShoppingBasket',
    ['$http', '$q', 'baseUrl', 'Products', '$rootScope', function ($http, $q, baseUrl, Products, $rootScope) {
        var _myCart = { products: [], isFinish: false, deliveryAddress: "" },
            _basketItemsInCart = {},
            _getProductsInMyCart = function () {
                var deferred = $q.defer();

                $http.get(baseUrl + "ShoppingCart").then(function (result) {
                    angular.copy(result.data, _basketItemsInCart);
                    $http.get(baseUrl + "products").then(function (result) {
                        var products = result.data;
                        angular.forEach(_basketItemsInCart.items, function (basketItem) {
                            basketItem.product = {};
                            angular.forEach(products, function (product) {
                                if (basketItem.productId == product.id) {
                                    basketItem.product = product;
                                }
                            });
                        });
                    });
                    deferred.resolve(_basketItemsInCart);
                    //}).error(function () {
                    //    deferred.reject();
                });
                return deferred.promise;
            },
            _addItemToShoppingCart = function (newItem) {
                //#region Demo event
                //$rootScope.$broadcast('productModel::productAdded', newItem);
                //#endregion
                var deferred = $q.defer();
                var existingProduct = _findProductInCart(newItem);
                if (existingProduct === undefined) {
                    //POST
                    $http.post(baseUrl + "ShoppingCart", { ProductId: newItem.id, Quantity: 1 })
                        .then(function (result) {
                            var basketItem = {};
                            angular.copy(result.data, basketItem);

                            angular.forEach(Products.products, function (product) {
                                if (newItem.id == product.id) {
                                    product.itemsInStock = product.itemsInStock - 1;
                                    basketItem.product = product;
                                }
                            });
                            _basketItemsInCart.items.splice(0, 0, basketItem);
                            deferred.resolve(newItem);
                        },
                        function (reason) {
                            deferred.reject(reason);
                        });
                }
                else {
                    //PUT
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
                return deferred.promise;
            },
            _removeItemFromMyCart = function (productToRemove) {
                _.find(_basketItemsInCart, { 'id': productToRemove.id });
            },
            _clearMyCart = function () {
                _basketItemsInCart.length = 0;
            };

        var _findProductInCart = function (lookFor) {
            return _.find(_basketItemsInCart.items, { 'productId': lookFor.id });
        };

        return {
            getProductsInMyCart: _getProductsInMyCart,
            productsInMyCart: _basketItemsInCart,
            removeItemFromMyCart: _removeItemFromMyCart,
            clearMyCart: _clearMyCart,
            addItemToShoppingCart: _addItemToShoppingCart
        };
    }]);