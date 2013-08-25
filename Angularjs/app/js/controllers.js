(function () {
    'use strict';
    angular.module('shoppingCartApp.controllers', [])
        .controller('ProductList',
            ['$scope', 'Products', 'MyShoppingCart',
                function ($scope, Products, MyShoppingCart) {
                    $scope.data = Products;
                    $scope.isBusy = true;

                    Products.getProducts()
                    .then(function () {
                        //success
                    },
                    function () {
                        //error
                        alert("could not load topics");
                    })
                    .then(function () {
                        $scope.isBusy = false;
                    });

                    $scope.itemToAdd = {};
                    $scope.AddToCart = function () {
                        MyShoppingCart.addItemToShoppingCart($scope.itemToAdd)
                        .then(function () {
                            //success
                        },
                        function () {
                            //error
                        });
                    };
                }])
      .controller('ShoppingBasket',
        ['$scope', 'MyShoppingCart',
          function ($scope, MyShoppingCart) {
              $scope.data = MyShoppingCart;
          }]);
})();