'use strict';

angular.module('myApp')
    .directive('message', function () {
        return {
            templateUrl: 'views/directives/message.html',
            restrict: 'E',
            scope: {
                content: '='
            }
        }
    });