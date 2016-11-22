angular.module('bluetoothApp')
    .service('localStorage', function($window) {
        console.log('local storage service loaded');
        var exports = {};

        exports.set = function(key, value) {
            $window.localStorage[key] = value;
        };

        exports.get = function(key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        };

        exports.setObject = function(key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        };

        exports.getObject = function(key) {
            return JSON.parse($window.localStorage[key] || '{}');
        };

        exports.go = function(path) {
            $location.path(path);
        };

        return exports;
    });