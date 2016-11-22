angular.module('bluetoothApp')
    .service('common', function($location) {
        console.log('common service loaded');
        var exports = {};

        exports.actualDevice = null;

        exports.itsConnected = false;

        exports.go = function(path) {
            $location.path(path);
        };

        return exports;
    });