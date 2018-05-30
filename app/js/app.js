'use strict';

angular.module('myApp', [
    'ui.router',
    'services.config',
    'ui.grid',
    'ui.grid.resizeColumns',
    'ui.grid.pagination',
    'restangular',
    'ui.bootstrap',
    'naif.base64',
    'webcam',
    'vcRecaptcha',
    'angular-loading-bar',
    'angular-bind-html-compile',
    'ngIdle',
    'webStorageModule'
])
        .config(['$stateProvider', '$urlRouterProvider', 'configuration', '$httpProvider', 'RestangularProvider', '$provide', 'IdleProvider', '$logProvider',
            function ($stateProvider, $urlRouterProvider, configuration, $httpProvider, RestangularProvider, $provide, IdleProvider, $logProvider) {

                //obtener ruta del servidor para asignar el servidor REST
                
                var pathname = window.location.pathname.substring(1);
                var origin = window.location.origin;
                pathname = pathname.substring(0, pathname.indexOf("/"));
                var path = origin + "/" + pathname + "/api/";
                console.log(path);
                RestangularProvider.setBaseUrl(path);
                
                
                //configuración para correr localmente
                //RestangularProvider.setBaseUrl(configuration.apiEndpoint);
            
                $logProvider.debugEnabled(configuration.log);

                IdleProvider.idle(5 * 60);  // 5 minutos inactividad
                IdleProvider.timeout(10 * 60); // 10 minutos terminar el tiempo

                $httpProvider.interceptors.push('myMaskInterceptor');

                //configurar ui-grid para que tenga textos en español
                $provide.decorator('GridOptions', ['$delegate', 'i18nService', function ($delegate, i18nService) {
                        var gridOptions;
                        gridOptions = angular.copy($delegate);
                        gridOptions.initialize = function (options) {
                            var initOptions;
                            initOptions = $delegate.initialize(options);
                            return initOptions;
                        };
                        //es is the language prefix you want
                        i18nService.setCurrentLang('es');
                        return gridOptions;
                    }]);

                $urlRouterProvider.otherwise('/login');
                $stateProvider
                        .state('login', {
                            url: '/login',
                            templateUrl: 'views/login.html',
                            controller: 'LoginController'
                        })
                        .state('index', {
                            url: '/index',
                            templateUrl: 'index.html'
                        })
                        .state('app', {
                            url: '/panel',
                            templateUrl: 'views/panel/layout.html',
                            controller: 'MainController'
//                              resolve: {
//                                timeout: function (Idle) {
//                                    Idle.watch();
//                                }
//                            }
                        })
                        .state('app.404', {
                            url: '/404',
                            templateUrl: '404.html'
                        })
                        .state('app.inicio', {
                            url: '/inicio',
                            templateUrl: 'views/panel/inicio.html'
                        })
                        .state('app.registro', {
                            url: '/registro',
                            templateUrl: 'views/panel/registro.html',
                            controller: 'RegistroController'
                        })
                        .state('app.mensaje_registro', {
                            url: '/mensaje',
                            templateUrl: 'views/panel/mensaje_registro.html',
                            controller: 'RegistroController'
                        })
                        .state('app.ejemplo_directiva', {
                            url: '/ejemplo_directiva',
                            templateUrl: 'views/panel/ejemplo_directiva.html',
                            controller: 'DirectivasController'
                        })
            }])
        .run(['$rootScope', function ($rootScope) {
                $rootScope.version = "1.0.3";
            }]);
