'use strict';

angular.module('myApp')
        .controller('TarjetaBasicaController', ['$scope', '$timeout', 'ValidaService', 'ConsultaService', 'WebCamService', 'MessageService',
            function ($scope, $timeout, ValidaService, ConsultaService, WebCamService, MessageService) {

                $scope.cat = {};
                $scope.forma = {};
                $scope.calendar = {};
                $scope.format = ValidaService.formats_date()[0];

                $scope.dateOptions = {
                    formatYear: 'yy',
                    yearRange: 1,
                    startingDay: 1
                };


                $scope.channel_one = WebCamService.getOptions();
                $scope.channel_two = WebCamService.getOptions();
                $scope.channel_three = WebCamService.getOptions();

                $scope.open = function ($event, opened) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    $scope.calendar[opened] = !$scope.calendar[opened];
                };

                $scope.getTiposId = function () {
                    var metodo = "catdocumento";
                    ConsultaService.getRestAngular(metodo)
                            .then(function (result) {
                                $scope.tiposidlist = result;
                            })
                            .catch(function (err) {
                                console.log("Exception: ", err)
                            });
                };
                $scope.getTiposId();
                
//                $scope.cat.nombre_uno = "Juan";
//                $scope.cat.nombre_dos = "Carlos";
//                $scope.cat.ap_paterno = "Santana";
//                $scope.cat.ap_materno = "Flores";
//                $scope.cat.nombre_m_tarjeta = "JUAN CARLOS SANTANA FLOR";
//                $scope.cat.fecha_nacimiento = new Date();
//                $scope.cat.rfc = "FESW840526";
                //$scope.cat.tipo_id = 1;
//                $scope.cat.num_id = 11122222;
//                $scope.cat.vigencia = 2018;
//                $scope.cat.domicilio = "Domicilio conocido";
//                $scope.cat.llave = "SDFSDFSDF2343";
//                $scope.cat.nom_empresa = "Bimbo";
//                $scope.cat.rfc_empresa = "rfcbimbo";
//                $scope.cat.rfc_rlegal = "rfclegal";

                $scope.inicio = function () {
//                    $timeout(function () {
//                        if ($scope.forma.form !== undefined) {
//                            $scope.forma.form.tipo_id.$setValidity('error', false);
//                        }
//                    });

                };
                $scope.inicio();

                $scope.$watch('cat.tipo_id', function (newValue, oldValue) {
                    if ($scope.forma.form !== undefined) {
                        if (newValue != undefined) {
                            $scope.forma.form.tipo_id.$setValidity('error', newValue != "");
                        }
                    }
                });
//                $scope.$watch('channel_one.file', function (newValue, oldValue) {
//                    if ($scope.forma.form !== undefined) {
//                        if (newValue != undefined) {
//                            $scope.forma.form.$setValidity('channel_one_error', newValue != null);
//                        }
//                    }
//                });


                $scope.onError_one = function (err) {
                    console.log("onError_one");
                    console.log(err);
                    $scope.$apply(function () {
                        $scope.channel_one.webcamError = err;
                    });
                };

                $scope.onError_two = function (err) {
                    console.log("onError_two");
                    console.log(err);
                    $scope.$apply(function () {
                        $scope.channel_two.webcamError = err;
                    });
                };

                $scope.onError_three = function (err) {
                    console.log("onError_three");
                    console.log(err);
                    $scope.$apply(function () {
                        $scope.channel_three.webcamError = err;
                    });
                };

                $scope.makeSnapshot = function (snapshot, no_channel) {
                    var _video;
                    if (no_channel == 1) {
                        _video = $scope.channel_one.channel.video;
                    } else if (no_channel == 2) {
                        _video = $scope.channel_two.channel.video;
                    } else if (no_channel == 3) {
                        _video = $scope.channel_three.channel.video;
                    }
                    WebCamService.makeSnapshot(_video, snapshot)
                            .then(function (res) {
                                console.log(res);
                                if (no_channel == 1) {
                                    $scope.channel_one = res;
                                } else if (no_channel == 2) {
                                    $scope.channel_two = res;
                                } else if (no_channel == 3) {
                                    $scope.channel_three = res;
                                }
                            })
                            .catch(function (err) {
                                console.log("Exception: ", err);
                            });
                };

                $scope.quitar_foto = function (no_channel) {
                    if (no_channel == 1) {
                        WebCamService.removeFile($scope.channel_one);
                        $('#foto_one').val("");
                    } else if (no_channel == 2) {
                        WebCamService.removeFile($scope.channel_two);
                        $('#foto_two').val("");
                    } else if (no_channel == 3) {
                        WebCamService.removeFile($scope.channel_three);
                        $('#foto_three').val("");
                    }
                };

                $scope.on_change_input_one = function () {
                    $scope.on_change_input(1);
                };
                $scope.on_change_input_two = function () {
                    $scope.on_change_input(2);
                };
                $scope.on_change_input_three = function () {
                    $scope.on_change_input(3);
                };

                $scope.on_change_input = function (no_channel) {
                    if (no_channel == 1) {
                        $scope.channel_one.badjuntado = true;
                    } else if (no_channel == 2) {
                        $scope.channel_two.badjuntado = true;
                    } else if (no_channel == 3) {
                        $scope.channel_three.badjuntado = true;
                    }
                };

                $scope.limpiar = function () {
                    $scope.cat = {};
                    $scope.inicio();
                    $scope.quitar_foto(1);
                    $scope.quitar_foto(2);
                    $scope.quitar_foto(3);
                };

                $scope.guardar = function () {
                    var metodo = "Registro";

                    var params = $scope.cat;
                    var parameters = {};
                    params.id_usuario = 1;
                    params.na_dia = $scope.cat.fecha_nacimiento.getDate();
                    params.na_mes = $scope.cat.fecha_nacimiento.getMonth() + 1;
                    params.na_anio = $scope.cat.fecha_nacimiento.getFullYear();

                    parameters.datos_tarjeta = params;
                    parameters.cliente = params;
                    parameters.documentos = [];
                    var documento = {};
                    var file = $scope.channel_one.file;
                    documento.id_documento = 1;
                    documento.ext = file.filename == undefined ? "png" : file.filename.substring(file.filename.indexOf("."));
                    documento.doc_base64 = file.base64;
                    parameters.documentos.push(documento);
                    documento = {};
                    file = $scope.channel_two.file;
                    documento.id_documento = 2;
                    documento.ext = file.filename == undefined ? "png" : file.filename.substring(file.filename.indexOf("."));
                    documento.doc_base64 = file.base64 == undefined ? "png" : file.base64;
                    parameters.documentos.push(documento);
                    documento = {};
                    file = $scope.channel_three.file;
                    documento.id_documento = 3;
                    documento.ext = file.filename == undefined ? "png" : file.filename.substring(file.filename.indexOf("."));
                    documento.doc_base64 = file.base64 == undefined ? "png" : file.base64;
                    parameters.documentos.push(documento);


                    ConsultaService.setRestAngular(metodo, parameters)
                            .then(function (res) {
                                console.log("res");
                                console.log(res);
                                $scope.limpiar();
                                MessageService.success($scope, res.descripcion);
                            })
                            .catch(function (err) {
                                console.log("Exception: ", err);
                                MessageService.error($scope, err.data.descripcion);
                            });
                };


            }]);

