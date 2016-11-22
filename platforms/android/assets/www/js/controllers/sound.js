angular.module('bluetoothApp')
  .controller('SoundCtrl', function($scope, localStorage, bluetooth, $rootScope, $ionicPlatform) {

    $scope.soundToPlay = '';
    $scope.loaded = {};
    $scope.lastSoundPlayed = '';


    $ionicPlatform.ready(function() {
      $rootScope.$on('bluetoothSerial:playSound', function(evt, data) {
        $scope.soundToPlay = data;
        $scope.$apply();
        console.log('sound: ' + $scope.soundToPlay);
        if ($scope.loaded[data.replace(/\s/g, '')]) {
          if ($scope.lastSoundPlayed.length > 0) {
            console.log('entro1');
            window.plugins.NativeAudio.stop($scope.lastSoundPlayed, function(msg) {
              console.log('cool: ' + msg);
            }, function(err) {
              console.log('noooo: ' + err);
            });
          }
          window.plugins.NativeAudio.play(data); // Play audio track
          $scope.lastSoundPlayed = data;
          console.log('$scope.lastSoundPlayed');
          console.log($scope.lastSoundPlayed);
        } else {
          window.plugins.NativeAudio.preloadComplex(data, getAudioRoute(data), 1, 1, 0, function(msg) {
            $scope.loaded[data.replace(/\s/g, '')] = true;
            if ($scope.lastSoundPlayed.length > 0) {
              console.log('entro 2');
              window.plugins.NativeAudio.stop($scope.lastSoundPlayed, function(msg) {
                console.log('cool: ' + msg);
              }, function(err) {
                console.log('noooo: ' + err);
              });
            }
            window.plugins.NativeAudio.play(data); // Play audio track
            $scope.lastSoundPlayed = data;
            console.log('$scope.lastSoundPlayed');
            console.log($scope.lastSoundPlayed);
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
