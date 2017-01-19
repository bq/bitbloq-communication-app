angular.module('bitbloqCom')
    .controller('DevicesCtrl', function($scope, bluetooth, common, $window, $interval, $timeout) {
        console.log('DevicesCtrl');

        var timer;
        $scope.Timer = null;
        $scope.common = common;

        /*$scope.$on('$ionicView.enter', function() {
          $scope.startSearchDevices();
        });*/

        $scope.startSearchDevices = function() {
            bluetooth.isEnabled().then(function() {
                $scope.searchDevices();
            }, function() {
                bluetooth.enable().then(function() {
                    $scope.searchDevices();
                }, function(error) {
                    alert('No se ha podido encender el Bluetooth, por favor activa el bluetooth en tu dispositivo ' + JSON.stringify(error));
                });
            });
        };

        $scope.searchDevices = function() {
            bluetooth.list().then(function(response) {
                console.log('devices found');
                $scope.devices = response;
            }, function(error) {
                alert('No hemos podido buscar dispositivos ' + JSON.stringify(response));
            });
        };

        $scope.goToBluetooth = function() {
            $scope.startTimeout();
            $scope.stopTimer();
            $scope.startTimer();
            cordova.plugins.diagnostic.switchToBluetoothSettings();

        };
        $scope.connectToDevice = function(device) {
            bluetooth.connect(device.address).then(
                function(response) {
                    common.selectedDevice = device;
                    console.log('full conected');
                    $timeout.cancel(timer);
                    $scope.stopTimer();
                }
            );
        };


        function initDevices() {
            $scope.startSearchDevices();
        }

        initDevices();


        $scope.startTimer = function() {
            $scope.Timer = $interval(function() {
                $scope.startSearchDevices();
            }, 1000);
        };

        $scope.stopTimer = function() {
            if (angular.isDefined($scope.Timer)) {
                $interval.cancel($scope.Timer);
            }
        };



        $scope.startTimeout = function() {
            timer = $timeout(function() {
                $scope.stopTimer();
            }, 50000);
        };

        $scope.$on("$destroy", function(event) {
            console.log("destroyed");
            $timeout.cancel(timer);
            $scope.stopTimer();
        });

        $scope.devices = [];

    });
