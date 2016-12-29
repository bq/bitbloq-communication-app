angular.module('bitbloqCom')
    .controller('MenuCtrl', function($scope, bluetooth, common) {
        console.log('MenuCtrl');
        $scope.common = common;

        $scope.refresh = function() {
            bluetooth.connect(common.selectedDevice.address).then(
                function(response) {
                    console.log('refresh');
                }
            );
        };

    });
