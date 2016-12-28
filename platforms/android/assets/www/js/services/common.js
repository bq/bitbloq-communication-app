angular.module('bluetoothApp')
    .service('common', function($location, $ionicPopup) {
        console.log('common service loaded');
        var exports = {};

        exports.actualDevice = null;

        exports.itsConnected = false;

        exports.go = function(path) {
            $location.path(path);
        };

        exports.showAlert = function(title, msg) {
            var alertPopup = $ionicPopup.alert({
                title: title,
                template: msg
            });

            alertPopup.then(function(res) {
                console.log('Thank you for not eating my delicious ice cream cone');
            });
        };

        return exports;
    });
