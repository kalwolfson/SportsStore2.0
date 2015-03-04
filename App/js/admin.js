var admin=angular.module("sportsStoreAdmin", ["ngRoute", "ngResource"]);
admin.config(function ($routeProvider) {

    $routeProvider.when("/login", {
        templateUrl: "views/adminLogin.html"
    });

    $routeProvider.when("/main", {
        templateUrl: "views/adminMain.html"
    });

    $routeProvider.otherwise({
        redirectTo: "/login"
    });
});