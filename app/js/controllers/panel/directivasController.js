'use strict';

angular.module('myApp')
        .controller('DirectivasController', ['$scope',
            function ($scope) {
                  
                $scope.tabla1 = {
                    titulo: "Tabla de nombres y edades",
                    cabeceras: [{cabecera: "Nombre"}, {cabecera:"Edad"}],
                    registros: [{nombre: "Juan perez", edad: 20}, {nombre: "Alfredo Dominguez", edad: 30}]
                };
                
                 $scope.tabla2 = {
                    titulo: "Tabla de nombres y edades 2",
                    cabeceras: [{cabecera: "Nombre"}, {cabecera:"Edad"}],
                    registros: [{nombre: "Filiberto Navas", edad: 40}, {nombre: "Eveneser Lopez", edad: 45}]
                };
                
            }]);
