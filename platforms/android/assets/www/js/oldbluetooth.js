angular.module('bluetoothApp')
    .controller('BluetoothCtrl', function($scope, $cordovaBluetoothLE, $cordovaBluetoothSerial) {
        console.log('BluetoothCtrl');
        console.log($cordovaBluetoothSerial);
        $scope.initialize = function() {
            console.log('initialize');
            $cordovaBluetoothLE.initialize({ request: true }).then(null,
                function(obj) {
                    //Handle errors
                    console.log('ERROR');
                    console.log(obj);

                },
                function(obj) {
                    //Handle successes
                    console.log('TODO OK');
                    console.log(obj);
                }
            );
        };

        $scope.enable = function() {
            console.log('enable');
            $cordovaBluetoothLE.enable().then(null,
                function(obj) {
                    //Handle errors
                    console.log('ERROR');
                    console.log(obj);

                },
                function(obj) {
                    //Handle successes
                    console.log('TODO OK');
                    console.log(obj);
                }
            );
        };

        $scope.startScan = function() {
            console.log('startScan');
            $cordovaBluetoothLE.startScan({ services: [] }).then(null,
                function(obj) {
                    //Handle errors
                    console.log(obj.message);
                },
                function(obj) {
                    console.log('scanResult');
                    console.log(obj);
                    if (obj.status == "scanResult") {
                        //Device found
                    } else if (obj.status == "scanStarted") {
                        //Scan started
                    }
                }
            );
        };


        $scope.pairDevices = [];

        $scope.textToSend = '';


        $scope.list = function() {
            console.log('list');
            console.log($cordovaBluetoothSerial);
            bluetoothSerial.list(function(data) {
                console.log('success');
                console.log(data);
                $scope.pairDevices = data;
                $scope.$apply();
            }, function(data) {
                console.log('error');
                console.log(data);
            });
        };

        $scope.isEnabled = function() {
            console.log('isEnabled');
            bluetoothSerial.isEnabled(
                function(response) {
                    console.log('yes it is');
                    console.log(response);
                },
                function(response) {
                    console.log('not enabled');
                    console.log(response);
                }
            );
        };
        $scope.connect = function(device) {
            console.log('connect');
            bluetoothSerial.connect(
                device.address, // device to connect to
                listenPort, // start listening if you succeed
                function(response) {
                    console.log('error on connect');
                    console.log(response);
                }
            );
        };

        function listenPort() {
            bluetoothSerial.subscribe('\n', function(data) {
                console.log('data incoming');
                console.log(data);
            });
        };
        $scope.disconnect = function() {
            console.log('disconnect');
            bluetoothSerial.unsubscribe(
                function(data) {
                    console.log('OK disconnect');
                    console.log(data);
                },
                function(error) {
                    console.log('error on disconnect');
                    console.log(error);
                }
            );
        };

        $scope.write = function(text) {
            bluetoothSerial.write(text, function(data) {
                console.log('write OK');
                console.log(data);
            }, function(data) {
                console.log('write go WRONG');
                console.log(data);
            });
        }

        $scope.itsConnected = function() {
            bluetoothSerial.isConnected(function(data) {
                console.log('its connected');
                console.log(data);
            }, function(data) {
                console.log('not connected');
                console.log(data);

            });
        }
    });