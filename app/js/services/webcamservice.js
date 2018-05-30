'use strict';

angular.module('myApp')
        .factory('WebCamService', ['$q', '$timeout',
            function ($q, $timeout) {
                return{
                    getOptions: function () {
                        return {
                            channel: {},
                            webcamError: null,
                            file: null,
                            badjuntado: false,
                            file_error_tamano: false
                        };
                    },
                    onError: function ($scope, err) {
                        $timeout(function () {
                            $scope.$apply(function () {
                                return err;
                            }
                            );
                        });
                    },
                    makeSnapshot: function (_video, snapshot) {
                        var defer = $q.defer();
                        if (_video) {
                            var patCanvas = document.querySelector(snapshot);
                            if (!patCanvas)
                                return;

                            patCanvas.width = _video.width;
                            patCanvas.height = _video.height;
                            var ctxPat = patCanvas.getContext('2d');
                            var idata = this.getVideoData(_video, 0, 0, _video.width, _video.height);
                            ctxPat.putImageData(idata, 0, 0);
                            var _options = this.sendSnapshotToServer(patCanvas.toDataURL());
                            _options.channel = {};
                            _options.channel.video = _video;
                            defer.resolve(_options);
                        }
                        return defer.promise;
                    },
                    getVideoData: function (video, x, y, w, h) {
                        var hiddenCanvas = document.createElement('canvas');
                        hiddenCanvas.width = video.width;
                        hiddenCanvas.height = video.height;
                        var ctx = hiddenCanvas.getContext('2d');
                        ctx.drawImage(video, 0, 0, video.width, video.height);
                        return ctx.getImageData(x, y, w, h);
                    },
                    sendSnapshotToServer: function (imgBase64) {
                        var options = {};
                        options.file = {};
                        options.file.base64 = imgBase64;
                        options.badjuntado = false;
                        return options;
                    },
                    removeFile: function (channel) {
                        channel.file = null;
                        channel.badjuntado = false;
                        channel.file_error_tamano = false;
                        //return channel;
                    }
                }
            }]);

