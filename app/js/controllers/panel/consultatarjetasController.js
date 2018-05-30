'use strict';

angular.module('myApp')
        .controller('DetalleCoreController', ['$scope', '$stateParams', 'ConsultaService', '$timeout', 'UtilService', 'uiGridConstants', 'TableHTMLService',
            function ($scope, $stateParams, ConsultaService, $timeout, UtilService, uiGridConstants, TableHTMLService) {

                $scope.filtros = $stateParams.filtros;
//                $scope.filtros = "?fecha_inicio=" + $stateParams.fecha_inicio +
//                        "&fecha_fin=" + $stateParams.fecha_fin +
//                        "&bcreados=" + $stateParams.bcreados +
//                        "&bcore=" + $stateParams.bcore;

                $scope.gridOptions = UtilService.gridOptions();
                $scope.gridOptions.onRegisterApi = function (gridApi) {
                    $scope.gridApi = gridApi;
                };
                $scope.gridOptions.columnDefs = [
                    {name: 'Consecutivo', field: 'id', enableFiltering: false},
                    {name: 'ID Contrato', field: 'idcontrato', enableFiltering: false},
                    {name: 'ID Grupo', field: 'idgrupo', enableFiltering: false},
                    {name: 'ID Cliente', field: 'idcliente', enableFiltering: false},
                    {name: 'Cliente', field: 'nombre_cliente', width: 250},
                    {name: 'Zona', field: 'zona', enableFiltering: false},
                    {name: 'Dirección', field: 'domicilio', enableFiltering: false},
                    {name: 'Código postal', field: 'codigo_postal', enableFiltering: false},
                    {name: 'Etiqueta U', field: 'nunicodoc'},
                    {name: 'Estado del expediente', field: 'estatus_expediente', enableFiltering: false},
                    {name: 'Producto', field: 'producto'},
                    {name: 'Subproducto', field: 'subproducto'},
                    {name: 'Completividad', field: 'completividad', enableFiltering: false},
                    {name: 'Estado del crédito', field: 'estatus_credito', enableFiltering: false}
                ];


                $scope.cargainfo = function () {
                    var metodo = "detalle_core.action" + $scope.filtros;
                    console.log(metodo);
                    ConsultaService.getWorker(metodo)
                            .then(function (result) {
                                console.log("result");
                                console.log(result);
                                $scope.result = result.data;
                                //guardar en un nuevo arreglo con los nombres de los titulares del excel
                                $scope.result_excel = [];
                                for (var i = 0; i < $scope.result.length; i++) {
                                    $scope.result_excel.push(
                                            {'Consecutivo': $scope.result[i].id,
                                                'Id Contrato': $scope.result[i].idcontrato,
                                                'ID Grupo': $scope.result[i].idgrupo,
                                                'ID Cliente': $scope.result[i].idcliente,
                                                'Cliente': $scope.result[i].nombre_cliente,
                                                'Zona': $scope.result[i].zona,
                                                'Dirección': $scope.result[i].domicilio,
                                                'Código postal': $scope.result[i].codigo_postal,
                                                'Etiqueta U': $scope.result[i].nunicodoc,
                                                'Estado del expediente': $scope.result[i].estatus_expediente,
                                                'Producto': $scope.result[i].producto,
                                                'Subproducto': $scope.result[i].subproducto,
                                                'Completividad': $scope.result[i].completividad,
                                                'Estado del crédito': $scope.result[i].estatus_credito
                                            });
                                }
                            })
                            .catch(function (men) {
                                console.log("Exception: " + men);
                            })
                };
                $scope.cargainfo();

                $scope.mostrar_buscadores = function () {
                    $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
                    $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
                };

                var options_excel = {
                    headers: true,
                    sheetid: 'Core'
                };

                $scope.exportarExcel = function () {
                    var file_name = "detalle_core.xlsx";
                    var res = window.confirm("¿En verdad deseas exportar a Excel?");
                    if (res == true) {
                        alasql.promise('SELECT * INTO XLSX("' + file_name + '",?) FROM ?', [options_excel, $scope.result_excel])
                                .then(function (data) {
                                })
                                .catch(function (err) {
                                    console.log('Error: ', err);
                                });
                    }
                };


            }]);
