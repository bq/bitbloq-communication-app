angular.module('bluetoothApp')
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
      var q = $q.defer();
      $ionicLoading.show({
        template: 'Conectando...'
      });
      $window.bluetoothSerial.connect(address, function() {
        common.itsConnected = true;
        $window.bluetoothSerial.subscribe('\n', function(data) {
          /*  console.log('data incoming');
            console.log(data);*/
          switch (data.split('-')[0]) {
            case 'playSound':
              $rootScope.$emit('bluetoothSerial:playSound', data.split('-')[1]);
              break;
            case 'write':
              $rootScope.$emit('bluetoothSerial:write', data.split('-')[1]);
              break;
            case '':
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
      alert('hellooo in write');
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

    return exports;
  });
