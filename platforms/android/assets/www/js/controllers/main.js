angular.module('bluetoothApp')
    .controller('MainCtrl', function($scope, localStorage, bluetooth, $rootScope, $ionicPlatform) {
        var configT = {};

        $scope.soundToPlay = '';
        $scope.loaded = {};
        $scope.lastSoundPlayed = '';
        $scope.bluetoothData = '';
        $scope.torchStatus = 'La linterna está apagada';
        $scope.isOn = false;
        $scope.isOff = true;
        var intensityFloat = 100;
        var toggle;
        var toggleTime = 1;


        $rootScope.$on('bluetoothSerial:write', function(evt, data) {
            $scope.bluetoothData = data;
            $scope.$apply();
        });
        $rootScope.$on('bluetoothSerial:turnonFlashlight', function(evt, data) {
            $scope.turnonFlashlight(data);
        });
        $rootScope.$on('bluetoothSerial:turnoffFlashlight', function(evt) {
            $scope.turnoffFlashlight();
        });

        $rootScope.$on('bluetoothSerial:toggleFlashlight', function(evt, data) {
            $scope.toggle(data);
        });
        $rootScope.$on('bluetoothSerial:twitterConfig', function(evt, data) {
            $scope.twitterConfig(data);
            $scope.$apply();
        });

        $rootScope.$on('bluetoothSerial:twitterSend', function(evt, data) {
            console.log('data Twitter');
            console.log(data);
            $scope.sendTwitter(data);
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

        $scope.recognizedText = "";
        $scope.textSended = "";

        $scope.record = function() {
            $scope.textSended = "Enviando mensaje";
            var recon = '';
            //var recognition = new webkitSpeechRecognition(); //To Computer
            var recognition = new SpeechRecognition(); // To Device
            recognition.lang = 'es-ES';

            recognition.onresult = function(event) {
                if (event.results.length > 0) {
                    $scope.recognizedText = event.results[0][0].transcript;
                    recon = event.results[0][0].transcript.replace(/\s+/g, '');
                    bluetooth.write(recon).then(function() {
                        $scope.textSended = 'Mensaje enviado';
                    }, function(error) {
                        alert('No hemos podido enviar el mensaje por Bluetooth ' + JSON.stringify(error));
                    });
                    $scope.$apply();
                }
            };

            recognition.start();
        };

        $scope.send = function(message) {
            bluetooth.write(message).then(null, function(error) {
                alert('No hemos podido enviar el mensaje por Bluetooth ' + JSON.stringify(error));
            });
        };

        var flashTimer = false;
        $scope.turnonFlashlight = function(intensity) {
            console.log('turnonFlashlight');
            intensityFloat = parseFloat(intensity);
            if (intensityFloat > 100) {
                intensityFloat = 100;
            }

            if (flashTimer) {
                console.log('está flashTimer en on');
            } else {
                console.log('no hay flashTimer en on');
                flashTimer = true;
                setTimeout(function() {
                    flashTimer = false;
                }, 500);
                window.plugins.flashlight.available(function(isAvailable) {
                    if (isAvailable) {
                        window.plugins.flashlight.switchOn(
                            function() {
                                $scope.isOn = true;
                                $scope.isOff = false;
                                $scope.torchStatus = 'La linterna está encendida';
                                $scope.$apply();
                            }, // optional success callback
                            function() {}, // optional error callback
                            {
                                intensity: intensityFloat / 100
                            } // optional as well
                        );
                    } else {
                        alert("Flashlight not available on this device");
                    }
                });
            }
        };

        //Poner en el if un alert de que no puede gestionar tanto
        $scope.turnoffFlashlight = function() {
            console.log('turnoffFlashlight');

            if (flashTimer) {
                console.log('está flashTimer en off');
            } else {
                console.log('no hay flashTimer en off');

                flashTimer = true;
                setTimeout(function() {
                    flashTimer = false;
                }, 500);
                window.plugins.flashlight.available(function(isAvailable) {
                    if (isAvailable) {
                        window.plugins.flashlight.switchOff(
                            function(success) {
                                $scope.isOn = false;
                                $scope.isOff = true;
                                $scope.torchStatus = 'La linterna está apagada';
                                $scope.$apply();
                            },
                            function(error) {
                                $scope.isOn = true;
                                $scope.isOff = false;
                            }
                        );
                    } else {
                        alert("Flashlight not available on this device");
                    }
                });
            }
        };


        $scope.twitterConfig = function(options) {
            configT = window.twitterWrap.configTwitter(options);
        };

        $scope.sendTwitter = function(msg) {
            if (configT) {
                window.twitterWrap.sendTwitter(msg, configT);
            } else {
                alert('No has configurado las credenciales de Twitter');
            }
        };


        $scope.toggle = function(time) {
            toggleTime = parseFloat(time);
            if (toggleTime < 0.05) {
                toggleTime = 0.05;
            }
            if (toggle) {
                console.log('no hago nada');
                //    clearInterval(toggle);
            } else {
                toggle = setInterval(function() {
                    window.plugins.flashlight.toggle();
                }, toggleTime * 1000);
            }
        };
        document.addEventListener("backbutton", function() {
            // pass exitApp as callbacks to the switchOff method
            window.plugins.flashlight.switchOff(exitApp, exitApp);
        }, false);

    });
