angular.module('stop_motion_pi_pro.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
})

.controller('SetIPCtrl', function($scope, connectService) {
    var current_ip = connectService.get_ip();
    if (current_ip) {
        $scope.current_ip = current_ip;
    }
    
    $scope.set_ip = function(ip, form_name) {
        connectService.set_ip(ip);
        $scope.current_ip = ip;
//        console.log(form_name);
//        $scope[form_name].$setPristine();
//        $scope[form_name].$setUntouched();
    };
})

.controller('takeImageCtrl', function($scope, $ionicPopup, connectService, cameraService) {
    var ip = connectService.get_ip();
    
    $scope.clear_mount = function() {
        cameraService.clear_mount(ip).then(function(response) {
            var success_message = $ionicPopup.alert({
                title: "Success Message",
                template: response
            })
        })
    };
    
    $scope.take_image = function() {
        cameraService.take_image(ip).then(function(response) {
            var success_message = $ionicPopup.alert({
                title: "Success Message",
                template: response
            });
        });
    };
});
