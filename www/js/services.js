angular.module('stop_motion_pi_pro.services', [])

.constant('DjangoCamControllerAPI', '')

.factory('connectService', function() {
    return {
        set_ip: function(ip) {
            localStorage['connection_ip'] = ip;
        },
        get_ip: function() {
            return localStorage['connection_ip'];
        }
    }
})

.factory('cameraService', function($http, DjangoCamControllerAPI) {
    return {
        take_image: function(ip) {
//            var capture_image = $http.get('http://' + ip + ':8000/camera_ops/take_image/')
            var capture_image = $http.get(DjangoCamControllerAPI + '/camera_ops/take_image/')
            .then(function(response) {
                var image_captured = response.data.success;
                console.log(image_captured);
                return image_captured;
            });
            
            return capture_image;
        }
    }
})