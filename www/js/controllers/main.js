angular.module('bluetoothApp')
    .controller('MainCtrl', function($scope, localStorage, bluetooth, $rootScope, $ionicPlatform) {

        $scope.soundToPlay = '';
        $scope.loaded = {};
        $scope.lastSoundPlayed = '';
        $scope.bluetoothData = '';

        $rootScope.$on('bluetoothSerial:write', function(evt, data) {
            $scope.bluetoothData = data;
            $scope.$apply();
        });
        $rootScope.$on('bluetoothSerial:playSound', function(evt, data) {
            $scope.bluetoothData = '';
            $scope.soundToPlay = data;
            $scope.$apply();
            if ($scope.loaded[data.replace(/\s/g, '')]) {
                if ($scope.lastSoundPlayed.length > 0) {
                    window.plugins.NativeAudio.stop($scope.lastSoundPlayed);
                }
                window.plugins.NativeAudio.play(data); // Play audio track
                $scope.soundToPlay = '';
                $scope.lastSoundPlayed = data;
            } else {
                window.plugins.NativeAudio.preloadComplex(data, getAudioRoute(data), 1, 1, 0, function(msg) {
                    $scope.loaded[data.replace(/\s/g, '')] = true;
                    if ($scope.lastSoundPlayed.length > 0) {
                        window.plugins.NativeAudio.stop($scope.lastSoundPlayed);
                    }
                    window.plugins.NativeAudio.play(data); // Play audio track
                    $scope.soundToPlay = '';
                    $scope.lastSoundPlayed = data;
                }, function(msg) {
                    console.log('error: ' + msg); // Loading error
                });
            }

        });

        function getAudioRoute(audio) {
            return 'audio/' + audio.replace(/\s/g, '') + '.mp3';
        }


    });
