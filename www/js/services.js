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
        clear_mount: function(ip) {
//            var get_pid = $http.get('http://' + ip + ':8000/camera_ops/clear_mount/')
            var get_pid = $http.get(DjangoCamControllerAPI + '/camera_ops/clear_mount/')
            .then(function(response) {
                var mount_cleared = response.data.success;
                return mount_cleared;
            });
            
            return get_pid;
        },
        take_image: function(ip) {
//            var capture_image = $http.get('http://' + ip + ':8000/camera_ops/take_image/')
            var capture_image = $http.get(DjangoCamControllerAPI + '/camera_ops/take_image/')
            .then(function(response) {
                var image_captured = response.data.success;
                return image_captured;
            });
            
            return capture_image;
        }
    }
})