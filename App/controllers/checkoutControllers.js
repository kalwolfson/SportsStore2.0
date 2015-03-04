﻿'use strict';
var app = angular.module("sportsStore");
app.controller("cartSummaryController", function($scope, cart) {
    $scope.cartData = cart.getProducts();
    console.log($scope.cartData);
    $scope.total = function() {
        var total = 0;
        for (var i = 0; i < $scope.cartData.length; i++) {
            total += ($scope.cartData[i].price * $scope.cartData[i].count);
        }
        return total;
    }
    $scope.remove = function(id) {
        cart.removeProduct(id);
    }
});