(function () {
    'use strict';
    angular.module('shoppingCartApp.controllers')
        .controller('ProductListController',
            ['$scope', 'Notifications', 'Products', 'MyShoppingBasket',
                function ($scope, Notifications, Products, MyShoppingBasket) {
                    $scope.data = Products;

                    Products.getProducts().then(function () {
                        //success
                    },
                    function () {
                        //error
                        alert("could not load products");
                    });

                    $scope.itemToAdd = {};

                    $scope.AddToCart = function (product) {
                        MyShoppingBasket.addItemToShoppingCart(product)
                        .then(function () {

                            Notifications.pushForCurrentRoute({ title: "item added", body: "Product sucessfully added", type: "info" });
                        },
                        function (reason) {
                            Notifications.pushForCurrentRoute({title: "Error", body: reason.data.message, type: "error"});
                        });
                    };
                    $scope.defineItemColor = function (product) {
                        if (product.itemsInStock == 0) {
                            return "danger";
                        }
                        if (product.itemsInStock <= 2) {
                            return "warning";
                        }
                    }

                    $scope.$on('authorModel::selectedAuthorUpdated', function (event) {
                        $scope.selectedAuthor = authorListModel.selectedAuthor;
                    });
                }]);
})();