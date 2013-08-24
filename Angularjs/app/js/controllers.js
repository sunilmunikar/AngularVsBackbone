'use strict';

/* Controllers */

angular.module('shoppingCartApp.controllers', [])
    .controller('MyCtrl1', ['$scope', 'Product', function ($scope, Product) {
        $scope.Product = Product;
    }])
  .controller('MyCtrl2', ['$scope', 'Product', function ($scope, Product) {
      $scope.Product = Product;
  }]);