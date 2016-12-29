angular.module('bitbloqCom')
  .controller('DevicesCtrl', function($scope, bluetooth, common) {
    console.log('DevicesCtrl');

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

    $scope.connectToDevice = function(device) {
      bluetooth.connect(device.address).then(
        function(response) {
          common.selectedDevice = device;
          console.log('full conected');
        }
      );
    };

    $scope.devices = [];

  });
