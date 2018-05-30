'use strict';

angular.module('myApp')
        .controller('MainController', ['$scope', '$rootScope', '$state', 'ConsultaService', 'Idle', 'AuthService','$log',
            function ($scope, $rootScope, $state, ConsultaService, Idle, AuthService,$log) {
                Idle.watch(); 
                $rootScope.class_menu = "sidebar-mini";
                $scope.bcollapse = false;

                $scope.collapse = function () {
                    if (!$scope.bcollapse) {
                        $rootScope.class_menu = "sidebar-mini sidebar-collapse";
                    } else {
                        $rootScope.class_menu = "sidebar-mini";
                    }
                    $scope.bcollapse = !$scope.bcollapse;
                };

                $scope.logout = function () {
                    AuthService.logout();
                };

                // se activa cuando termina el tiempo de IdleProvider.idle
                $scope.$on('IdleStart', function () {
                    $log.info("IdleStart");
                    $log.info(new Date());
                });

                //se activa cuanto termina el tiempo de IdleProvider.timeout
                $scope.$on('IdleTimeout', function () {
                    $log.info("IdleTimeout");
                    $log.info(new Date());
                    $scope.logout();
                });

                $scope.$on('IdleWarn', function (e, countdown) {
                });

                //se activa cuanto termina el tiempo de IdleProvider.timeout o se interrumpe
                $scope.$on('IdleEnd', function () {
                    $log.info("IdleEnd");
                    $log.info(new Date());
                    $scope.heart_beat();
                });

                $scope.heart_beat = function () {
                    //manda llamar al token del backend para saber si sigue vigente
                    $log.info("heartbeat");
                    $log.info(new Date());
                    ConsultaService.getRestAngular('heartbeat')
                            .then(function (data) {
                                $log.info(data);
                                if (AuthService.isLoggedIn()) {
                                    Idle.watch();
                                }else{
                                    AuthService.logout();
                                }
                            })
                            .catch(function (data) {
                                //no se detecta respuesta del backend y se sale a la pantalla de login
                                $log.info("catch heartbeat");
                                $state.go('login');
                            });
                };

            }]);

