// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'bluetoothapp' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'bluetoothapp.controllers' is found in controllers.js
angular.module('bitbloqCom', [
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
        'menu-connected': 'Connected',
        'device-board-is-sending': 'Board is sending...',
        'device-sound': 'The device is playing the sound...',
        'device-send-voice': 'Send voice commands to Bitbloq',
        'device-torch': 'Control device flashlight',
        'device-torch-on': 'Flashlight is on.',
        'device-torch-off': 'Flashlight is off.',
        'device-torch-toggle': 'Flashlight is flickering',
        'device-twitter': 'Twitter',
        'device-twitter-published': 'You have posted in Twitter',
        'device-sensor-value': 'Value',
        'device-sending-message': 'Sending message...',
        'device-message-sended': 'Message sended.',
        'device-sensor-gravity': 'Gravity sensor',
        'device-sensor-orientation': 'Orientation sensor',
        'device-sensor-gyroscope': 'Gyroscope',
        'device-sensor-proximity': 'Proximity sensor',
        'device-sensor-light': 'Light sensor',
        'device-sensor-magnetic': 'Magnetic field sensor',
        'device-value-axis': 'The value in axis',
        'device-is': 'is',
        'device-sensor-light-covered': 'Light sensor is covered',
        'device-sensor-light-not-covered': 'Light sensor is not covered',
        'device-bluetooth-error': 'It was impossible to send the message via Bluetooth',
        'device-flashlight-error': 'Flashlight not available on this device',
        'device-twitter-error': 'Error publishing tweet',
        'device-twitter-error-credentials': 'Incorrect Twitter credentials',
        'device-twitter-error-duplicate': 'Status is a duplicate',
        'device-twitter-error-no-credentials': 'You have not configured Twitter credentials'

    });
    $translateProvider.translations('es', {
        'devices-intro': 'Empieza buscando tu dispositivo bluetooth y haciendo click en él para conectarte',
        'devices-button-search--devices': 'Buscar dispositivos',
        'menu-buttons': 'Botonera',
        'menu-sound': 'Sonido',
        'buttonspad-send': 'Enviar',
        'buttonspad-add--button': 'Crear Nuevo',
        'menu-no--connection': 'Sin conexíon',
        'menu-connected': 'Conectado',
        'device-board-is-sending': 'La placa está enviando...',
        'device-sound': 'El dispositivo está emitiendo el sonido...',
        'device-send-voice': 'Envía comandos por voz a Bitbloq',
        'device-torch': 'Controla la linterna',
        'device-torch-on': 'La linterna está encendida.',
        'device-torch-off': 'La linterna está apagada.',
        'device-torch-toggle': 'La linterna está parpadeando',
        'device-twitter': 'Twitter',
        'device-twitter-published': 'Se ha publicado en Twitter',
        'device-sensor-value': 'Valor',
        'device-sending-message': 'Enviando mensaje...',
        'device-message-sended': 'Mensaje enviado.',
        'device-sensor-gravity': 'Sensor de gravedad',
        'device-sensor-orientation': 'Sensor de orientación',
        'device-sensor-gyroscope': 'Giroscopio',
        'device-sensor-proximity': 'Sensor de proximidad',
        'device-sensor-light': 'Sensor de luz',
        'device-sensor-magnetic': 'Sensor de campo magnético',
        'device-value-axis': 'El valor en el eje',
        'device-is': 'es',
        'device-sensor-light-covered': 'El sensor de luz está tapado',
        'device-sensor-light-not-covered': 'El sensor de luz no está tapado',
        'device-bluetooth-error': 'No hemos podido enviar el mensaje por Bluetooth',
        'device-flashlight-error': 'Linterna no disponible en este dispositivo',
        'device-twitter-error': 'Error al publicar tweet',
        'device-twitter-error-credentials': 'Credenciales de Twitter incorrectas',
        'device-twitter-error-duplicate': 'El mensaje es un duplicado',
        'device-twitter-error-no-credentials': 'No has configurado las credenciales de Twitter'

    });
    $translateProvider.preferredLanguage('en');
});
