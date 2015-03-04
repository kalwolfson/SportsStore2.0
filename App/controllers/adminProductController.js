angular.module("sportsStoreAdmin")
.constant("productUrl", "https://api.parse.com/1/classes/Products/")
.run(function ($http) {
    $http.defaults.headers.common["X-Parse-Application-Id"] = "AmZllhYqBwgMSppbWXIWbl24cSugMRvt2BsqlK8F";
    $http.defaults.headers.common["X-Parse-REST-API-Key"] = "MSdKYKCX4aZBo2Hpcg0VKRrov8fzVt6U52TtcQEl";
})
.controller("productCtrl", function ($scope, $http, $resource, productUrl, $route) {

    $scope.$on("sessionToken", function (sessionToken) {
        $http.defaults.headers.common["X-Parse-Session-Token"] = sessionToken;
    });

    function getData(data, headers) {
     
        return JSON.parse(data).results;
    }

    $scope.productsResource = $resource(productUrl + ":id", { id: "@objectId" }, {
        query: { method: "GET", isArray: true, transformResponse: getData },
        update: { method: "PUT" }
    });

    $scope.listProducts = function () {
        $scope.products = $scope.productsResource.query();
    }

    $scope.deleteProduct = function (product) {
        product.$delete().then(function () {
            $scope.products.splice($scope.products.indexOf(product), 1);
        });
    }

    $scope.createProduct = function (product) {
        new $scope.productsResource(product).$save().then(function (response) {
            response.$get().then(function (newProduct) {
                $scope.products.push(newProduct);
                $scope.uploadFile();
                $scope.editedProduct = null;
            })
        });
    }

    $scope.updateProduct = function (product) {
        var pCopy = {};
        angular.copy(product, pCopy)
        product.$update().then(function () {
            $scope.editedProduct = null;
            $scope.reloadRoute= function() {
                $route.reload();
            }
        })
    }

    $scope.startEdit = function (product) {
        $scope.editedProduct = product;
    }

    $scope.cancelEdit = function () {
        $scope.editedProduct = null;
    }
    $scope.uploadFile = function (files) {
        console.log(files);

        $http.post("https://api.parse.com/1/files/image.jpg", files[0], {
            withCredentials: false,
            headers: {
                'X-Parse-Application-Id': "AmZllhYqBwgMSppbWXIWbl24cSugMRvt2BsqlK8F",
                'X-Parse-REST-API-Key': "MSdKYKCX4aZBo2Hpcg0VKRrov8fzVt6U52TtcQEl",
                'Content-Type': 'image/jpeg'
            },
            transformRequest: angular.identity
        }).then(function (response) {
            
            //here is where youd typically attach the img to the model.
            //Pic1.url = data.url;
            //model did not have the url so when it saved i think it believes theres no img, but you uploaded it, what i think is missing 
            $scope.editedProduct.Pic1 = {
                "__type": "File",
                "name": response.data.name,
                "url": response.data.url
            };
            

        });
    };
    $scope.listProducts();
});