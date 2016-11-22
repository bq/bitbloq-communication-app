angular.module('bluetoothApp')
  .controller('ButtonsPadCtrl', function($scope, localStorage, bluetooth, $rootScope) {
    console.log('ButtonsPadCtrl');

    $scope.bluetoothData = '';


    $scope.buttons = localStorage.getObject('buttons');
    if (Object.prototype.toString.call($scope.buttons) !== '[object Array]') {
      $scope.buttons = [];
    }

    $scope.addButton = function() {
      $scope.buttons.push({
        text: ''
      });
    };

    $scope.removeButton = function(button) {
      var index = $scope.buttons.indexOf(button);
      $scope.buttons.splice(index, 1);
      $scope.saveButtons();
    };

    $scope.send = function(button) {
      bluetooth.write(button.text).then(null, function(error) {
        alert('No hemos podido enviar el mensaje por Bluetooth ' + JSON.stringify(error));
      });
    };

    $rootScope.$on('bluetoothSerial:write', function(evt, data) {
      $scope.bluetoothData = data;
      $scope.$apply();
    });

/*    $scope.receive = function() {
      bluetooth.read().then(null, function(data) {
        $scope.bluetoothData = data;
      });
    };
*/
    $scope.saveButtons = function() {
      localStorage.setObject('buttons', $scope.buttons);
    };
  });
