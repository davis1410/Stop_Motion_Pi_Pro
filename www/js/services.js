angular.module('stop_motion_pi_pro.services', [])

//.constant('DjangoCamControllerAPI', '')
//.constant('DjangoCamControllerAPI', 'http://localhost:8100')

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

.factory('cameraService', function($http) {
    return {
        get_num_images: function(ip) {
            var url = 'http://' + ip + ':8000/camera_ops/get_num_images/';
            
            var num_images = $http.get(url)
            .then(function(response) {
                var num_images_returned = response.data.num_images;
                return num_images_returned;
            });
            
            return num_images;
        },
        take_image: function(ip) {
            var url = 'http://' + ip + ':8000/camera_ops/take_image/';
//            var url = DjangoCamControllerAPI + '/camera_ops/take_image/';
            
            var capture_image = $http.get(url)
            .then(function(response) {
                var image_captured = {
                    result: response.data.result,
                    num_images: response.data.num_images
                }
                return image_captured;
            });
            
            return capture_image;
        },
        compile_preview: function(ip, framerate) {
            var url = 'http://' + ip + ':8000/camera_ops/compile_preview/?framerate=' + framerate;
//            var url = DjangoCamControllerAPI + '/camera_ops/compile_preview/?framerate=' + framerate;
            
            var compile_video = $http.get(url)
            .then(function(response) {
                var movie_compiled = response.data.result;
                return movie_compiled;
            });
            return compile_video;
        },
        new_sequence_creation: function(ip) {
            var url = 'http://' + ip + ':8000/camera_ops/new_sequence_creation/';
            
            var new_sequence = $http.get(url)
            .then(function(response) {
                var new_sequence_ready = {
                    result: response.data.result,
                    num_images: response.data.num_images
                }
                return new_sequence_ready;
            });
            
            return new_sequence;
        }
    }
})