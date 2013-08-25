/// <reference path="../lib/angular/angular.js" />
(function () {

    'use strict';

    angular.module('shoppingCartApp',
        [
        'shoppingCartApp.filters',
        'shoppingCartApp.services',
        'shoppingCartApp.directives',
        'shoppingCartApp.controllers',
        'services.httpRequestTracker'
        ])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/view1', {
                templateUrl: 'partials/partial1.html',
                controller: 'ProductListController'
            });
            $routeProvider.when('/ShoppingBasket', {
                templateUrl: 'partials/shoppingBasket.html',
                controller: 'ShoppingBasketController'
            });
            $routeProvider.otherwise({ redirectTo: '/index.html' });
        }]);

    angular.module('shoppingCartApp')
    .controller('AppCtrl',
        ['$scope', 'httpRequestTracker', function ($scope, httpRequestTracker) {
            $scope.config = { debug: true }
            $scope.hasPendingRequest = function () {
                return httpRequestTracker.hasPendingRequest();
            }
        }]);
}());