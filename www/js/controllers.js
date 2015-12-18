angular.module('stop_motion_pi_pro.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
})

.controller('SetOpsCtrl', function($scope, connectService) {
    var current_ip = connectService.get_ip();
    var current_framerate = connectService.get_framerate();
    
    if (current_ip) {
        $scope.current_ip = current_ip;
    };
    
    if (current_framerate) {
        $scope.current_framerate = current_framerate;
    }
    
    $scope.set_ip = function(ip, form_name) {
        connectService.set_ip(ip);
        $scope.current_ip = ip;
//        console.log(form_name);
//        $scope[form_name].$setPristine();
//        $scope[form_name].$setUntouched();
    };
    
    $scope.set_framerate = function(framerate) {
        connectService.set_framerate(framerate);
        $scope.current_framerate = framerate;
    };
})

.controller('takeImageCtrl', function($scope, $ionicPopup, connectService, cameraService) {
    var ip;
    var framerate;
    
    $scope.$on('$ionicView.enter', function(e) {
        ip = connectService.get_ip();
        framerate = connectService.get_framerate();
    });
    
    $scope.take_image = function() {
        cameraService.take_image(ip).then(function(response) {
            var result = $ionicPopup.alert({
                title: "Message",
                template: response
            });
        });
    };
    
    $scope.compile_preview = function() {
        cameraService.compile_preview(ip, framerate).then(function(response) {
            var result = $ionicPopup.alert({
                title: "Message",
                template: response
            });
        });
    };
});
