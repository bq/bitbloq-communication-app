angular.module('bluetoothApp')
    .controller('MainCtrl', function($scope, localStorage, bluetooth, $rootScope, $interval, $ionicPlatform) {
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

        $rootScope.$on('bluetoothSerial:readLAccel', function(evt, axis) {
            sendLAccel(axis);
            $scope.$apply();
        });

        $rootScope.$on('bluetoothSerial:readAccel', function(evt, axis) {
            sendAccel(axis);
            $scope.$apply();
        });

        $rootScope.$on('bluetoothSerial:readGravity', function(evt, axis) {
            sendGravity(axis);
            $scope.$apply();
        });

        $rootScope.$on('bluetoothSerial:readGyros', function(evt, axis) {
            sendGyros(axis);
            $scope.$apply();
        });

        $rootScope.$on('bluetoothSerial:readProx', function(evt, covered) {
            sendProx(covered);
            $scope.$apply();
        });

        $rootScope.$on('bluetoothSerial:readLight', function(evt) {
            sendLight();
            $scope.$apply();
        });

        $rootScope.$on('bluetoothSerial:readMagnetic', function(evt) {
            sendMagnetic();
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

        function sendLAccel(axis) {
            document.addEventListener("deviceready", function() {
                $scope.sensorRead = "ACELERÓMETRO para medir aceleración lineal";
                sensors.enableSensor("LINEAR_ACCELERATION");
                sensors.getState(function(values) {
                    console.log('values');
                    console.log(values);
                    var laccel;
                    switch (axis) {
                        case "x":
                            laccel = values[0];
                            break;
                        case "y":
                            laccel = values[1];
                            break;
                        case "z":
                            laccel = values[2];
                            break;
                    }
                    console.log("hay acceeeel");
                    if (!laccel) {
                        console.log("NAN!!!!");
                        laccel = "NaN";
                    }
                    console.log("laccel: " + laccel);
                    bluetooth.write(laccel.toString()).then(function() {
                        $scope.sensorValue = 'El valor en el eje ' + axis + 'es: ' + laccel + ' (m/s²)';
                    }, function(error) {
                        alert('No hemos podido enviar el mensaje por Bluetooth ' + JSON.stringify(error));
                    });
                });

            });
        }


        function sendAccel(axis) {
            document.addEventListener("deviceready", function() {
                $scope.sensorRead = "ACELERÓMETRO para medir aceleración";
                sensors.enableSensor("ACCELEROMETER");
                sensors.getState(function(values) {
                    console.log('values');
                    console.log(values);
                    var accel;
                    switch (axis) {
                        case "x":
                            accel = values[0];
                            break;
                        case "y":
                            accel = values[1];
                            break;
                        case "z":
                            accel = values[2];
                            break;
                    }
                    console.log("hay acceeeel");
                    if (!accel) {
                        console.log("NAN!!!!");
                        accel = "NaN";
                    }
                    console.log("accel: " + accel);
                    bluetooth.write(accel.toString()).then(function() {
                        $scope.sensorValue = 'El valor en el eje ' + axis + 'es: ' + accel + ' (m/s²)';
                    }, function(error) {
                        alert('No hemos podido enviar el mensaje por Bluetooth ' + JSON.stringify(error));
                    });
                });

            });
        }



        function sendGravity(axis) {
            document.addEventListener("deviceready", function(axis) {
                $scope.sensorRead = "SENSOR DE GRAVEDAD";
                sensors.enableSensor("GRAVITY");
                sensors.getState(function(values) {
                    console.log('values');
                    console.log(values);
                    var gravity;
                    switch (axis) {
                        case "x":
                            gravity = values[0];
                            break;
                        case "y":
                            gravity = values[1];
                            break;
                        case "z":
                            gravity = values[2];
                            break;
                    }
                    console.log("hay gravity");
                    if (!gravity) {
                        console.log("NAN!!!!");
                        gravity = "NaN";
                    }
                    console.log("gravity: " + gravity);
                    bluetooth.write(gravity.toString()).then(function() {
                        $scope.sensorValue = 'El valor en el eje ' + axis + 'es: ' + gravity + ' (m/s²)';
                    }, function(error) {
                        alert('No hemos podido enviar el mensaje por Bluetooth ' + JSON.stringify(error));
                    });
                });

            });
        }

        function sendGyros(axis) {
            document.addEventListener("deviceready", function() {
                $scope.sensorRead = "GIROSCOPIO";
                sensors.enableSensor("GYROSCOPE");
                sensors.getState(function(values) {
                    console.log('values');
                    console.log(values);
                    var gyro;
                    switch (axis) {
                        case "x":
                            gyro = values[0];
                            break;
                        case "y":
                            gyro = values[1];
                            break;
                        case "z":
                            gyro = values[2];
                            break;
                    }
                    console.log("hay gyro");
                    if (!gyro) {
                        console.log("NAN!!!!");
                        gyro = "NaN";
                    }
                    console.log("gyro: " + gyro);
                    bluetooth.write(gyro.toString()).then(function() {
                        $scope.sensorValue = 'El valor en el eje ' + axis + 'es: ' + gyro + ' (rad/s)';
                    }, function(error) {
                        alert('No hemos podido enviar el mensaje por Bluetooth ' + JSON.stringify(error));
                    });
                });

            });
        }

        function sendProx(covered) {
            console.log("el valor de covered");
            console.log(covered);

            //recibe covered,nCovered
            document.addEventListener("deviceready", function() {
                $scope.sensorRead = "SENSOR DE PROXIMIDAD";
                sensors.enableSensor("PROXIMITY");
                sensors.getState(function(values) {
                    console.log("values");
                    console.log(values);
                    var isCovered;
                    if (!values || values.length === 0) {
                        console.log("NAN!!!!");
                        isCovered = "NaN";
                    } else {
                        if (values[0] === 0) {
                          //está tapado
                            console.log("entro en el if");
                            if (covered === 'covered') {
                                isCovered = true;
                                $scope.sensorValue = "el sensor está tapado";
                            } else {
                                isCovered = false;
                                $scope.sensorValue = "el sensor está tapado";
                            }
                        } else {
                          //no está tapado
                            console.log("entro en el else");
                            if (covered === 'covered') {
                                isCovered = false;
                                $scope.sensorValue = "el sensor no está tapado";
                            } else {
                                isCovered = true;
                                $scope.sensorValue = "el sensor no está tapado";
                            }
                        }
                    }
                    console.log("isCovered");
                    console.log(isCovered);
                    bluetooth.write(isCovered.toString()).then(function() {
                    }, function(error) {
                        alert('No hemos podido enviar el mensaje por Bluetooth ' + JSON.stringify(error));
                    });
                });
            });
        }



        function sendLight() {
            document.addEventListener("deviceready", function() {
                $scope.sensorRead = "SENSOR DE LUZ";
                sensors.enableSensor("LIGHT");
                sensors.getState(function(values) {
                    var light;
                    if (!values || values.length === 0) {
                        console.log("NAN!!!!");
                        light = "NaN";
                    } else {
                        light = values[0];
                    }
                    console.log("light: " + light);
                    bluetooth.write(light.toString()).then(function() {
                        $scope.sensorValue = light + ' (lx)';
                    }, function(error) {
                        alert('No hemos podido enviar el mensaje por Bluetooth ' + JSON.stringify(error));
                    });
                });

            });
        }



        function sendMagnetic(axis) {
            $scope.sensorRead = "SENSOR DE CAMPO MAGNÉTICO";
            document.addEventListener("deviceready", function() {
                sensors.enableSensor("MAGNETIC_FIELD");
                sensors.getState(function(values) {
                    console.log('values');
                    console.log(values);
                    var magnetic;
                    switch (axis) {
                        case "x":
                            magnetic = values[0];
                            break;
                        case "y":
                            magnetic = values[1];
                            break;
                        case "z":
                            magnetic = values[2];
                            break;
                    }
                    console.log("hay magnetic");
                    if (!magnetic) {
                        console.log("NAN!!!!");
                        magnetic = "NaN";
                    }
                    console.log("magnetic: " + magnetic);
                    bluetooth.write(magnetic.toString()).then(function() {
                        $scope.sensorValue = 'El valor en el eje ' + axis + 'es: ' + magnetic + ' (µT)';
                    }, function(error) {
                        alert('No hemos podido enviar el mensaje por Bluetooth ' + JSON.stringify(error));
                    });
                });

            });
        }


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
            } else {
                toggle = setInterval(function() {
                    window.plugins.flashlight.toggle();
                    $scope.torchStatus = 'La linterna está parpadeando';
                }, toggleTime * 1000);
            }
        };





        document.addEventListener("backbutton", function() {
            // pass exitApp as callbacks to the switchOff method
            window.plugins.flashlight.switchOff(exitApp, exitApp);
        }, false);

    });
