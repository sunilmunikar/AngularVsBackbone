(function() {
    'use strict';

    angular.module('shoppingCartApp.controllers')
        .controller('ProductListController',
            ['$scope', 'Notifications', 'Products', 'MyShoppingBasket',
                function($scope, Notifications, Products, MyShoppingBasket) {

                    ////#region Fake service

                    //var productList = {};
                    //var products = [];
                    //products[0] = { name: "Schwinn Women's Community 700c Hybrid Bicycle", price: 339.99, itemsInStock: 4 };
                    //productList.products = products;

                    //$scope.data = productList;

                    //////#endregion

                    //#region Real service

                    $scope.data = Products;
                    Products.getProducts().then(function() {
                        //success
                        //alert("product loaded");
                    }, function() {
                        //error
                        alert("could not load products");
                    });

                    $scope.AddToCart = function(product) {
                        MyShoppingBasket.addItemToShoppingCart(product)
                            .then(function() {
                                Notifications.pushForCurrentRoute({ title: "item added", body: "Product sucessfully added", type: "info" });
                            }, function(reason) {
                                Notifications.pushForCurrentRoute({ title: "Error", body: reason.data.message, type: "error" });
                            });
                    };

                    //#endregion

                    $scope.defineItemColor = function(product) {
                        if (product.itemsInStock == 0) {
                            return "danger";
                        }
                        if (product.itemsInStock > 0 && product.itemsInStock <= 5) {
                            return "warning";
                        }
                        return "";
                    };
                }
            ]);
})();