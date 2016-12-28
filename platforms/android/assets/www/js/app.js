// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'bluetoothapp' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'bluetoothapp.controllers' is found in controllers.js
angular.module('bluetoothApp', [
    'ionic',
    'ngCordovaBluetoothLE',
    'ngCordova.plugins.bluetoothSerial',
    'pascalprecht.translate'
])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }

        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $translateProvider, $ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom'); // other values: top
    $stateProvider

        .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'MenuCtrl'
    })


    .state('app.devices', {
        url: '/devices',
        views: {
            'devices-tab': {
                templateUrl: 'templates/devices.html',
                controller: 'DevicesCtrl'
            }
        }
    })

    .state('app.main', {
            url: '/main',
            views: {
                'main-tab': {
                    templateUrl: 'templates/main.html',
                    controller: 'MainCtrl'
                }
            }
        })
        .state('bluetooth', {
            url: '/bluetooth',
            templateUrl: 'templates/bluetooth.html',
            controller: 'BluetoothCtrl'

        });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/main');


    $translateProvider.translations('en', {
        'devices-intro': 'Pair your Bluetooth device, then search your device here, and click it to connect',
        'devices-button-search--devices': 'Search devices',
        'menu-buttons': 'Commands Buttons',
        'menu-sound': 'Sound',
        'buttonspad-send': 'Send',
        'buttonspad-add--button': 'Add',
        'menu-no--connection': 'Connection lost',
        'menu-connected': 'Connected'
    });
    $translateProvider.translations('es', {
        'devices-intro': 'Empieza buscando tu dispositivo bluetooth y haciendo click en él para conectarte',
        'devices-button-search--devices': 'Buscar dispositivos',
        'menu-buttons': 'Botonera',
        'menu-sound': 'Sonido',
        'buttonspad-send': 'Enviar',
        'buttonspad-add--button': 'Crear Nuevo',
        'menu-no--connection': 'Sin conexíon',
        'menu-connected': 'Conectado'
    });
    $translateProvider.preferredLanguage('en');
});
