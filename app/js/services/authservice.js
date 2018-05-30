'use strict';

angular.module('myApp')
        .factory('AuthService', ['webStorage', '$state', '$log', function (webStorage, $state, $log) {

                return {
                    login: function (param) {
                        webStorage.session.set("usuario", param);
                        $state.go("app.registro");
                    },
                    logout: function () {
                        //webStorage.session.remove("usuario");
                        webStorage.clear();
                        $state.go("login");
                    },
                    isLoggedIn: function () {
                        return  webStorage.session.get("usuario") !== undefined && webStorage.session.get("usuario") !== null;
                    },
                    getDatosUsuario: function () {
                        return webStorage.session.get("usuario");
                    },
                    validarSesion: function () {
                        if (webStorage.session.get("usuario") === undefined || webStorage.session.get("usuario") === null) {
                            $state.go("login");
                        }
                    },
                    setVariable: function (key, value) {
                        webStorage.session.set(key, value);
                    },
                    getVariable: function (key) {
                        return webStorage.session.get(key);
                    }
                };
            }]);