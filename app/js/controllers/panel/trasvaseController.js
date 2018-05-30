'use strict';

angular.module('myApp')
        .controller('TrasvaseController', ['$scope', '$timeout', 'ValidaService', 'ConsultaService', 'MessageService',
            function ($scope, $timeout, ValidaService, ConsultaService, MessageService) {

                $scope.cat = {};
                $scope.lista = [];

                $scope.cat.ubicacion = "C101A00100104";
                $scope.cat.cajaDestino = 4407895;
                $scope.cat.nunicodoc = 167351186;


                $scope.guardar = function () {
                    ConsultaService.setRestAngular("trasvase",$scope.cat)
                        .then(function (result) {
                            console.log(result);
                            MessageService.success($scope,"Expediente "+$scope.cat.nunicodoc+" trasvasado");
                            $scope.listar();
                            $scope.cat.nunicodoc =  $scope.cat.nunicodoc + 1;
                        })
                        .catch(function (men) {
                            console.log("Ocurrió un error en el trasvasado");
                            MessageService.error($scope,"Ocurrió un error en el trasvasado");
                        });
                };

                $scope.listar = function () {
                    ConsultaService.listRestAngular("trasvase?caja="+$scope.cat.cajaDestino, null)
                        .then(function (result) {
                            console.log(result);
                            $scope.lista = result;
                        })
                        .catch(function (men) {
                            console.log(men);
                        });
                }

            }]);

