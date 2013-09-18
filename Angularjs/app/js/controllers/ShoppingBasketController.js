(function () {
    'use strict';
    angular.module('shoppingCartApp.controllers')
        .controller('ShoppingBasketController',
            ['$scope', 'MyShoppingBasket', 'Products',
                function ($scope, MyShoppingBasket, Products) {
                    var productList = Products;
                    $scope.data = MyShoppingBasket;

                    MyShoppingBasket.getProductsInMyCart().then(function (result) {
                        //console.log(result);
                    });

                    $scope.$on('productModel::productAdded', function (event, args) {
                        console.log(args);
                    });

                    console.log($scope.data);
                }
            ]);
})();