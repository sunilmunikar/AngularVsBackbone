(function () {
    'use strict';
    angular.module('shoppingCartApp.controllers')
        .controller('ShoppingBasketController',
            ['$scope', 'MyShoppingBasket', 'Products',
                function ($scope, MyShoppingBasket) {
                    $scope.data = MyShoppingBasket;

                    MyShoppingBasket.getProductsInMyCart();

                    //#region Demo event
                    //$scope.$on('productModel::productAdded', function (event, args) {
                    //    console.log(args);
                    //});
                    //#endregion
                }
            ]);
})();