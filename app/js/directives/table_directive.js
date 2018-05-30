'use strict';

angular.module('myApp')
        .directive('tableDirective', function () {
            
            return {
                templateUrl: 'views/directives/table_directive.html',
                restrict: 'E',
                scope: {
                    titulo: '=',
                    cabeceras: '=?',
                    registros: '=?'
                },
                link: function(scope,elem, attr ){
                    scope.total = 0;
                    for (var i = 0; i < scope.registros.length ; i++){
                        scope.total += scope.registros[i].edad;
                    }
                }
            }
        });
            