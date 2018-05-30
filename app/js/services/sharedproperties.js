angular.module('myApp')
        .service('sharedProperties', function () {
            var objeto = {};
            var mapa = new Map();
           
            return {
                getObject: function () {
                    return objeto;
                },
                setObject: function (value) {
                    objeto = value;
                },
                setMap: function (key, value) {
                    mapa.set(key, value);
                },
                getMap: function (findkey) {
                    var res;
                   mapa.forEach(function (item, key, mapObj) {
                        if(findkey == key){
                            res = item;
                        }
                    });
                    return res;
                },
                setSessionStorage:function (key, value) {
                    sessionStorage[key] = JSON.stringify(value);                    
                },
                getSessionStorage:function (key) {
                    return JSON.parse(sessionStorage[key]);
                } 
            }
        });