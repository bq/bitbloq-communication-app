angular.module('bitbloqCom')
    .service('bluetooth', function($rootScope, $q, $window, common, $ionicLoading) {
        console.log('bluetooth service loaded');
        var exports = {};

        exports.list = function() {
            var q = $q.defer();
            $window.bluetoothSerial.list(function(data) {
                q.resolve(data);
            }, function(error) {
                q.reject(error);
            });
            return q.promise;
        };

        exports.connect = function(address) {
            var command;
            var credentials;
            var q = $q.defer();
            $ionicLoading.show({
                template: 'Conectando...'
            });
            $window.bluetoothSerial.connect(address, function() {
                common.itsConnected = true;
                $window.bluetoothSerial.subscribe('\n', function(data) {
                    console.log("data");
                    console.log(data);
                    switch (data.split(/-(.+)?/)[0]) {
                        case 'playSound':
                            $rootScope.$emit('bluetoothSerial:playSound', data.split(/-(.+)?/)[1]);
                            break;
                        case 'write':
                            $rootScope.$emit('bluetoothSerial:write', data.split(/-(.+)?/)[1]);
                            break;
                        case 'turnonFlashlight':
                            $rootScope.$emit('bluetoothSerial:turnonFlashlight');
                            break;
                        case 'turnoffFlashlight':
                            $rootScope.$emit('bluetoothSerial:turnoffFlashlight');
                            break;

                        case 'toggleFlashlight':
                            $rootScope.$emit('bluetoothSerial:toggleFlashlight', data.split(/-(.+)?/)[1]);
                            break;
                        case 'twitterConfig':
                            credentials = generateCredentialsJSON(data.split(/-(.+)?/)[1]);
                            $rootScope.$emit('bluetoothSerial:twitterConfig', credentials);
                            break;
                        case 'twitterSend':
                            $rootScope.$emit('bluetoothSerial:twitterSend', data.split(/-(.+)?/)[1]);
                            break;
                        case 'readLAccel':
                            $rootScope.$emit('bluetoothSerial:readLAccel', data.split(/-(.+)?/)[1]);
                            break;
                        case 'readAccel':
                            $rootScope.$emit('bluetoothSerial:readAccel', data.split(/-(.+)?/)[1]);
                            break;
                        case 'readGravity':
                            $rootScope.$emit('bluetoothSerial:readGravity', data.split(/-(.+)?/)[1]);
                            break;
                        case 'readOrientation':
                            $rootScope.$emit('bluetoothSerial:readOrientation', data.split(/-(.+)?/)[1]);
                            break;
                        case 'readGyros':
                            $rootScope.$emit('bluetoothSerial:readGyros', data.split(/-(.+)?/)[1]);
                            break;
                        case 'readProx':
                            $rootScope.$emit('bluetoothSerial:readProx', data.split(/-(.+)?/)[1]);
                            break;
                        case 'readLight':
                            $rootScope.$emit('bluetoothSerial:readLight');
                            break;
                        case 'readMagnetic':
                            $rootScope.$emit('bluetoothSerial:readMagnetic', data.split(/-(.+)?/)[1]);
                            break;
                        default:
                            $rootScope.$emit('bluetoothSerial:write', data.split(/-(.+)?/)[0]);
                            break;
                    }
                    //    $rootScope.$emit('bluetoothSerial:emit', data);
                }, function(error) {
                    alert('Error al intentar recibir mensajes por Bluetooth');
                });
                $ionicLoading.hide();
                q.resolve();
            }, function(error) {
                common.itsConnected = false;
                alert('No hemos podido conectar al dispositivo, verifica que está emparejado y encendido. ' + JSON.stringify(error));
                $ionicLoading.hide();
                q.reject(error);
            });
            return q.promise;
        };


        // not supported on iOS
        exports.connectInsecure = function(address) {
            var q = $q.defer();
            $window.bluetoothSerial.connectInsecure(address, function() {
                q.resolve();
            }, function(error) {
                q.reject(error);
            });
            return q.promise;
        };

        exports.disconnect = function() {
            var q = $q.defer();
            $window.bluetoothSerial.disconnect(function() {
                common.itsConnected = false;
                bluetoothSerial.unsubscribe(
                    function(data) {
                        console.log('OK disconnect');
                        q.resolve();
                    },
                    function(error) {
                        console.log('error on disconnect');
                        console.log(error);
                        q.reject(error);
                    }
                );
            }, function(error) {
                q.reject(error);
            });
            return q.promise;
        };

        exports.list = function() {
            var q = $q.defer();
            $window.bluetoothSerial.list(function(data) {
                q.resolve(data);
            }, function(error) {
                q.reject(error);
            });
            return q.promise;
        };

        exports.discoverUnpaired = function() {
            var q = $q.defer();
            $window.bluetoothSerial.discoverUnpaired(function(data) {
                q.resolve(data);
            }, function(error) {
                q.reject(error);
            });
            return q.promise;
        };

        exports.setDeviceDiscoveredListener = function() {
            var q = $q.defer();
            $window.bluetoothSerial.setDeviceDiscoveredListener(function(data) {
                q.notify(data);
            });
            return q.promise;
        };

        exports.clearDeviceDiscoveredListener = function() {
            $window.bluetoothSerial.clearDeviceDiscoveredListener();
        };

        exports.showBluetoothSettings = function() {
            var q = $q.defer();
            $window.bluetoothSerial.showBluetoothSettings(function() {
                q.resolve();
            }, function(error) {
                q.reject(error);
            });
            return q.promise;
        };

        exports.isEnabled = function() {
            var q = $q.defer();
            $window.bluetoothSerial.isEnabled(function() {
                q.resolve();
            }, function() {
                q.reject();
            });
            return q.promise;
        };

        exports.enable = function() {
            var q = $q.defer();
            $window.bluetoothSerial.enable(function() {
                q.resolve();
            }, function() {
                q.reject();
            });
            return q.promise;
        };

        exports.isConnected = function() {
            alert('isconnected');
            var q = $q.defer();
            $window.bluetoothSerial.isConnected(function() {
                q.resolve();
            }, function() {
                q.reject();
            });
            return q.promise;
        };

        exports.available = function() {
            var q = $q.defer();
            $window.bluetoothSerial.available(function(data) {
                q.resolve(data);
            }, function(error) {
                q.reject(error);
            });
            return q.promise;
        };

        exports.read = function() {
            var q = $q.defer();
            $window.bluetoothSerial.read(function(data) {
                q.resolve(data);
            }, function(error) {
                q.reject(error);
            });
            return q.promise;
        };

        exports.readUntil = function(delimiter) {
            var q = $q.defer();
            $window.bluetoothSerial.readUntil(delimiter, function(data) {
                q.resolve(data);
            }, function(error) {
                q.reject(error);

            });
            return q.promise;
        };

        exports.write = function(data) {
            var q = $q.defer();
            $window.bluetoothSerial.write(data, function() {
                q.resolve();
            }, function(error) {
                q.reject(error);
            });
            return q.promise;
        };

        exports.subscribe = function(delimiter) {
            var q = $q.defer();
            $window.bluetoothSerial.subscribe(delimiter, function(data) {
                q.notify(data);
            }, function(error) {
                q.reject(error);
            });
            return q.promise;
        };

        exports.subscribeRawData = function() {
            var q = $q.defer();
            $window.bluetoothSerial.subscribeRawData(function(data) {
                q.notify(data);
            }, function(error) {
                q.reject(error);
            });
            return q.promise;
        };

        exports.unsubscribe = function() {
            var q = $q.defer();
            $window.bluetoothSerial.unsubscribe(function() {
                q.resolve();
            }, function(error) {
                q.reject(error);
            });
            return q.promise;
        };

        exports.unsubscribeRawData = function() {
            var q = $q.defer();
            $window.bluetoothSerial.unsubscribeRawData(function() {
                q.resolve();
            }, function(error) {
                q.reject(error);
            });
            return q.promise;
        };

        exports.clear = function() {
            var q = $q.defer();
            $window.bluetoothSerial.clear(function() {
                q.resolve();
            }, function(error) {
                q.reject(error);
            });
            return q.promise;
        };

        exports.readRSSI = function() {
            var q = $q.defer();
            $window.bluetoothSerial.readRSSI(function(data) {
                q.resolve(data);
            }, function(error) {
                q.reject(error);
            });
            return q.promise;
        };

        var generateCredentialsJSON = function(credentials) {
            var keys = credentials.split('/');
            var credentialsJSON = {};
            credentialsJSON.consumer_key = keys[0];
            credentialsJSON.consumer_secret = keys[1];
            credentialsJSON.access_token = keys[2];
            credentialsJSON.access_token_secret = keys[3];
            console.log('credentialsJSON');
            console.log(credentialsJSON);
            return credentialsJSON;
        };


        return exports;
    });
