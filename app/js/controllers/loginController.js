'use strict';

angular.module('myApp')
        .controller('LoginController', ['$scope', '$state', 'ConsultaService', 'AuthService','$log','$http',
            function ($scope,$state,ConsultaService, AuthService, $log, $http) {
               $scope.usuario={}; 
                               
                // $scope.ingresar = function(){
                //     if($scope.usuario.login == "admin" && $scope.usuario.password == "admin"){
                //     $state.go("app.captcha");
                // }else{
                //    $scope.mensaje= "Usuario o contraseña incorrecta";
                // }
                // };
                
                $http({
                    method: 'GET',
                    url: 'https://api.ipify.org?format=json'
                }).then(function successCallback(response) {
                    $log.info("response");
                    $log.info(response);
                    $scope.ip = response.data.ip;
                    AuthService.setVariable("ip",$scope.ip);
                }, function errorCallback(error) {
                    $log.error("error");
                    $log.error(error);
                });
                
               $scope.ingresar = function () {
                   var parameters = {usuario: $scope.usuario.login, password: $scope.usuario.password, ip: $scope.ip};
                   ConsultaService.setRestAngular("login",parameters)
                           .then(function (result) {
                               AuthService.login(result);
                           })
                           .catch(function (men) {
                               $log.error("Exception: ");
                               $log.error(men);
                               $scope.usuario.password = null;
                               $scope.mensaje= men.data.men;
                           });
               };
            }]);
