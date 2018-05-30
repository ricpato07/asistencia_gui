'use strict';

angular.module('myApp')
        .controller('RegistroController', ['$scope', '$state', 'MessageService', 'AuthService', 'ConsultaService', '$log',
            function ($scope, $state, MessageService, AuthService, ConsultaService, $log) {
                
                AuthService.validarSesion();

                $scope.cat = {};

                var usuario = AuthService.getDatosUsuario();
                if (usuario != undefined) {
                    $scope.cat.nombre = usuario.nombre;
                }

                $scope.cat.registro = "E";

                $scope.cat.ip = AuthService.getVariable("ip");

                $scope.guardar = function () {

                    if ($scope.cat.myRecaptchaResponse != undefined && $scope.cat.myRecaptchaResponse != "") {

                        var parameters = {usuario: usuario.login, ip: $scope.cat.ip, movimiento: $scope.cat.registro};
                        ConsultaService.setRestAngular("guardar", parameters)
                                .then(function (result) {
                                    $log.debug(result);
                                    $state.go("app.mensaje_registro");
                                })
                                .catch(function (men) {
                                    $log.debug("Exception: ");
                                    $log.debug(men);
                                    MessageService.error($scope, men.data.men);
                                });
                    } else {
                        $log.error("Es necesario seleccionar el captcha");
                        MessageService.error($scope, "Es necesario seleccionar el captcha");
                    }
                };

                $scope.salir = function () {
                    AuthService.logout();
                };

                $scope.close_message = function () {
                    MessageService.close($scope);
                };

            }]);

