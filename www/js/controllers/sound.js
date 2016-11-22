angular.module('bluetoothApp')
  .controller('SoundCtrl', function($scope, localStorage, bluetooth, $rootScope, $ionicPlatform) {

    $scope.soundToPlay = '';
    $scope.loaded = {};
    $scope.lastSoundPlayed = '';


    $ionicPlatform.ready(function() {
      $rootScope.$on('bluetoothSerial:playSound', function(evt, data) {
        $scope.soundToPlay = data;
        $scope.$apply();
        if ($scope.loaded[data.replace(/\s/g, '')]) {
          if ($scope.lastSoundPlayed.length > 0) {
            window.plugins.NativeAudio.stop($scope.lastSoundPlayed);
          }
          window.plugins.NativeAudio.play(data); // Play audio track
          $scope.lastSoundPlayed = data;
        } else {
          window.plugins.NativeAudio.preloadComplex(data, getAudioRoute(data), 1, 1, 0, function(msg) {
            $scope.loaded[data.replace(/\s/g, '')] = true;
            if ($scope.lastSoundPlayed.length > 0) {
              window.plugins.NativeAudio.stop($scope.lastSoundPlayed);
            }
            window.plugins.NativeAudio.play(data); // Play audio track
            $scope.lastSoundPlayed = data;
          }, function(msg) {
            console.log('error: ' + msg); // Loading error
          });
        }

      });
    });

    function getAudioRoute(audio) {
      return 'audio/' + audio.replace(/\s/g, '') + '.mp3';
    }
  });
