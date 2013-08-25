/// <reference path="../lib/angular/angular.js" />
(function () {

    'use strict';

    angular.module('shoppingCartApp',
        [
        'shoppingCartApp.filters',
        'shoppingCartApp.services',
        'shoppingCartApp.directives',
        'shoppingCartApp.controllers'
        ])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/view1', {
                templateUrl: 'partials/partial1.html',
                controller: 'ProductList'
            });
            $routeProvider.when('/ShoppingBasket', {
                templateUrl: 'partials/shoppingBasket.html',
                controller: 'ShoppingBasket'
            });
            $routeProvider.otherwise({ redirectTo: '/index.html' });
        }]);

    angular.module('shoppingCartApp')
    .controller('AppCtrl', ['$scope', function ($scope) {
        $scope.config = { debug: true }
    }]);
}());