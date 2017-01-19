angular.module('bitbloqCom')
    .service('common', function($location, $ionicPopup, $filter, $translate) {
        console.log('common service loaded');
        var exports = {};
        var language= navigator.language.split('-')[0] || navigator.userLanguage.split('-')[0] || 'en';
        exports.actualDevice = null;

        exports.itsConnected = false;

        exports.go = function(path) {
            $location.path(path);
        };

        exports.translate = $filter('translate');



        exports.getAudioRoute = function(audio) {
            return 'audio/' + audio.replace(/\s/g, '') + '.mp3';
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

        $translate.use(language);

        return exports;
    });
