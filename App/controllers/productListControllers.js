'use strict';
var app=angular.module("sportsStore");
app.constant("productListActiveClass", "btn-primary");
app.constant("productListPageCount", 3);
app.controller("productListCtrl", function($scope, $filter, $routeParams,$http,
    productListActiveClass, productListPageCount, cart) {

    var selectedCategory = null;

    $scope.selectedPage = 1;
    $scope.pageSize = productListPageCount;

    $scope.selectCategory = function(newCategory) {
        selectedCategory = newCategory;
        $scope.selectedPage = 1;
    }

    $scope.selectPage = function(newPage) {
        $scope.selectedPage = newPage;
    }

    $scope.categoryFilterFn = function(product) {
        return selectedCategory == null ||
            product.category == selectedCategory;
    }

    $scope.getCategoryClass = function(category) {
        return selectedCategory == category ? productListActiveClass : "";
    }

    $scope.getPageClass = function(page) {
        return $scope.selectedPage == page ? productListActiveClass : "";
    }

    $scope.addProductToCart = function(product) {
        cart.addProduct(product.objectId, product.name, product.price, product.Pic1.url);
    }
    $scope.getProductInfo = function () {
        console.log($routeParams);
        $http.get("https://api.parse.com/1/classes/Products/"+$routeParams.objectId)
       .success(function(data) {
           $scope.item = data;
           console.log(data);
       })
       .error(function(response) {
           $scope.data.error = response.error || response;
       });
    }
});
   