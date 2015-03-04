'use strict';
var app = angular.module("sportsStore");
app.constant("dataUrl", "https://api.parse.com/1/classes/Products");
app.constant("orderUrl", "https://api.parse.com/1/classes/orders");
app.run(function($http) {
    $http.defaults.headers.common["X-Parse-Application-Id"] = "AmZllhYqBwgMSppbWXIWbl24cSugMRvt2BsqlK8F";
    $http.defaults.headers.common["X-Parse-REST-API-Key"] = "MSdKYKCX4aZBo2Hpcg0VKRrov8fzVt6U52TtcQEl";
})
app.controller("sportsStoreCtrl", function ($scope, $http, $location, cart, dataUrl, orderUrl, $route, $routeParams) {
    $scope.$route = $route;
    $scope.$routeParams = $routeParams;
    $scope.data = {};
    $http.get(dataUrl)
        .success(function(data) {
            $scope.data.products = data.results;
            console.log($scope.data.products);
        })
        .error(function(response) {
            $scope.data.error = response.error || response;
        });
    if ($routeParams.id != null) {
        $scope.products = $scope.getProduct($routeParams.id);
    }
    $scope.sendOrder= function(shippingDetails) {
        var order = angular.copy(shippingDetails);
        order.products = cart.getProducts();
        $http.post(orderUrl, order)
            .success(function(data) {
                $scope.data.orderId = data.objectId;
                cart.getProducts().length = 0;
            })
            .error(function(error) {
                $scope.data.orderError = error;
            }).finally(function() {
                $location.path("/complete");
            });
    }
});


