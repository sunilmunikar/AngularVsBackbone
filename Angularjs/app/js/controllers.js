(function () {
    'use strict';
    angular.module('shoppingCartApp.controllers', [])
        .controller('ProductListController',
            ['$scope', 'Products', 'MyShoppingBasket',
                function ($scope, Products, MyShoppingBasket) {
                    $scope.data = Products;

                    Products.getProducts()
                    .then(function () {
                        //success
                    },
                    function () {
                        //error
                        alert("could not load topics");
                    });

                    $scope.itemToAdd = {};

                    $scope.AddToCart = function (product) {
                        MyShoppingBasket.addItemToShoppingCart(product)
                        .then(function () {
                            //success
                        },
                        function () {
                            //error
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
                }])
      .controller('ShoppingBasketController',
        ['$scope', 'MyShoppingBasket',
          function ($scope, MyShoppingBasket) {
              $scope.data = MyShoppingBasket;
          }]);
})();