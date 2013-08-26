(function () {
    'use strict';
    angular.module('shoppingCartApp.controllers')
        .controller('ShoppingBasketController',
            ['$scope', 'MyShoppingBasket',
                function ($scope, MyShoppingBasket) {
                    $scope.data = MyShoppingBasket;
                }
            ]);
})();