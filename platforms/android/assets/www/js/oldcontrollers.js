angular.module('starter.controllers', [])

.controller('App2Ctrl', function($scope, $ionicModal, $timeout, $cordovaBluetoothLE) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    console.log('appCtrl start');
    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };


    $cordovaBluetoothLE.initialize({ request: true }).then(null,
        function(obj) {
            //Handle errors
            console.log('ERROR');
            console.log(obj);

        },
        function(obj) {
            //Handle successes
            console.log('TODO OK');
            console.log(obj);
            $cordovaBluetoothLE.startScan({ services: [] }).then(null,
                function(obj) {
                    //Handle errors
                    console.log('ERROR on SCAN');
                    console.log(obj.message);
                },
                function(obj) {
                    if (obj.status == "scanResult") {
                        //Device found
                        console.log('SCAN RESULT');
                        console.log(obj);
                    } else if (obj.status == "scanStarted") {
                        //Scan started
                        console.log('SCAN STARTED');
                        console.log(obj);
                    }
                }
            );
        }
    );
})

.controller('PlaylistsCtrl', function($scope) {
    $scope.playlists = [
        { title: 'Reggae', id: 1 },
        { title: 'Chill', id: 2 },
        { title: 'Dubstep', id: 3 },
        { title: 'Indie', id: 4 },
        { title: 'Rap', id: 5 },
        { title: 'Cowbell', id: 6 }
    ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {});