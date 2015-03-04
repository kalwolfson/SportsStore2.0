'use strict';
var app=angular.module("sportsStore", ["customFilters", "cart", "ngRoute"/*,"products"*/]);
app.config(function ($routeProvider) {
    $routeProvider.when("/complete", {
        templateUrl: "views/thankYou.html"
    });
    $routeProvider.when("/placeorder", {
        templateUrl: "views/placeOrder.html"
    });
    $routeProvider.when("/products/:objectId", {
        templateUrl: "views/productDetail.html"
    })
    $routeProvider.when("/checkout", {
        templateUrl: "views/checkoutSummary.html"
    });
    $routeProvider.when("/products", {
        templateUrl: "views/productList.html"
    });
    
    $routeProvider.otherwise({
        templateUrl: "views/productList.html"
    });
});

