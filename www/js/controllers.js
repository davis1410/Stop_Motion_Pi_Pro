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
    };
    
    $scope.set_framerate = function(framerate) {
        connectService.set_framerate(framerate);
        $scope.current_framerate = framerate;
    };
})

.controller('sequenceCreationCtrl', function($scope, $ionicPopup, $ionicModal, $ionicLoading, $sce, connectService, cameraService) {
    var ip;
    var framerate;
    
    var show_message = function(response) {
        var result = $ionicPopup.alert({
            title: "Message",
            template: response
        });
    };
    
    $scope.show_modal = function(template) {
        $ionicModal.fromTemplateUrl(template, {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
            $scope.modal.show();
        })
    }
    
//    Close Modal
    $scope.closeModal = function() {
        $scope.modal.hide();
        $scope.modal.remove();
    }
    
    var num_images = function(ip) {
        cameraService.get_num_images(ip).then(function(num_images) {
            $scope.num_images = num_images;
        });
    };
    
    $scope.$on('$ionicView.enter', function(e) {
        ip = connectService.get_ip();
        framerate = connectService.get_framerate();
        num_images(ip);
    });
    
    $scope.take_image = function() {
        $ionicLoading.show({
            template: 'Capturing image. Please wait....'
        });
        
        cameraService.take_image(ip).then(function(response) {
            $ionicLoading.hide(); 
            show_message(response.result);
            $scope.num_images = response.num_images;
        });
    };
    
    $scope.compile_preview = function() {
        $ionicLoading.show({
            template: 'Compiling preview. Please wait....'
        });
        
        cameraService.compile_preview(ip, framerate).then(function(response) {
            $ionicLoading.hide();
            
            $scope.preview = $sce.trustAsResourceUrl('http://' + ip + ':8000/static/video/preview.mp4');
            $scope.show_modal('show_preview.html');
        });
    };
    
    $scope.new_sequence_creation = function() { 
        var confirmPopup = $ionicPopup.confirm({
            title: 'Start New Sequence Confirmation',
            template: 'Starting a new sequence will delete all images on the raspberry pi, but will preserve them on the camera memory card. Continue starting new sequence?'
       });

       confirmPopup.then(function(res) {
            if (res) {
                $ionicLoading.show({
                    template: 'Preparing new sequence. Please wait....'
                });

                cameraService.new_sequence_creation(ip).then(function(response) {
                    $ionicLoading.hide();

                    show_message(response.result);
                    $scope.num_images = response.num_images;
                });
            } else {
                show_message("New sequence cancelled")
            }
       });
    }
});
