'use strict';

angular.module('shoppingCartApp', [
    'shoppingCartApp.filters',
    'shoppingCartApp.services',
    'shoppingCartApp.directives',
    'shoppingCartApp.controllers'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'partials/partial1.html',
            controller: 'MyCtrl1'
        });
        $routeProvider.when('/view2', {
            templateUrl: 'partials/partial2.html',
            controller: 'MyCtrl2'
        });
        $routeProvider.otherwise({ redirectTo: '/view1' });
    }]);
