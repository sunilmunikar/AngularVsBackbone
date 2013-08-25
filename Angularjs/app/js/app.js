/// <reference path="../lib/angular/angular.js" />
(function () {

    'use strict';

    angular.module('shoppingCartApp',
        [
        'shoppingCartApp.filters',
        'shoppingCartApp.services',
        'shoppingCartApp.directives',
        'shoppingCartApp.controllers',
        'services.httpRequestTracker',
        'services.notifications'
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
            ['$scope', 'Notifications', 'httpRequestTracker',
                function ($scope, Notifications, httpRequestTracker) {
                    $scope.config = { debug: true }

                    $scope.notifications = Notifications;

                    $scope.removeNotification = function (notification) {
                        $scope.notifications.remove(notification);
                    };

                    $scope.hasPendingRequest = function () {
                        return httpRequestTracker.hasPendingRequest();
                    }
                }]);
}());