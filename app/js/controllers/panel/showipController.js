'use strict';

angular.module('myApp')
        .controller('ShowipController', ['$scope', '$http', 
            function ($scope, $http) {

                $http({
                    method: 'GET',
                    url: 'https://api.ipify.org?format=json'
                }).then(function successCallback(response) {
                    console.log("response");
                    console.log(response);
                   $scope.ip = response.data.ip;
                }, function errorCallback(error) {
                    console.log("error");
                    console.log(error);
                });



            }]);

