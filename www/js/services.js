angular.module('stop_motion_pi_pro.services', [])

//.constant('DjangoCamControllerAPI', '')
.constant('DjangoCamControllerAPI', 'http://localhost:8100')

.factory('connectService', function() {
    return {
        set_ip: function(ip) {
            localStorage['connection_ip'] = ip;
        },
        get_ip: function() {
            return localStorage['connection_ip'];
        },
        set_framerate: function(framerate) {
            localStorage['framerate'] = framerate;
        },
        get_framerate: function() {
            return localStorage['framerate'];
        }
    }
})

.factory('cameraService', function($http, DjangoCamControllerAPI) {
    return {
        take_image: function(ip) {
//            var url = 'http://' + ip + ':8000/camera_ops/take_image/;
            var url = DjangoCamControllerAPI + '/camera_ops/take_image/';
            
            var capture_image = $http.get(url)
            .then(function(response) {
                var image_captured = response.data.result;
                return image_captured;
            });
            
            return capture_image;
        },
        compile_preview: function(ip, framerate) {
//            var url = 'http://' + ip + ':8000/camera_ops/compile_preview/?framerate=' + framerate;
            var url = DjangoCamControllerAPI + '/camera_ops/compile_preview/?framerate=' + framerate;
            
            var compile_video = $http.get(url)
            .then(function(response) {
                var movie_compiled = response.data.result;
                return movie_compiled;
            });
            return compile_video;
        }
    }
})