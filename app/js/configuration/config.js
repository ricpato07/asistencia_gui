'use strict';

angular.module('services.config', [])
    .constant('configuration', {
        apiEndpoint: 'http://kraken-dev.adea.com.mx/springangular/api/',
        secure: 'true',
        log: 'true'
    });
