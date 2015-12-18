angular.module('stop_motion_pi_pro.services', [])

//.constant('DjangoCamControllerAPI', '')
//.constant('DjangoCamControllerAPI', 'http://192.168.1.12:8000')

.factory('connectService', function() {
    return {
        set_ip: function(ip) {
            localStorage['connection_ip'] = ip;
        },
        get_ip: function() {
            return localStorage['connection_ip'];
        },
        set_dir: function(dir) {
            localStorage['image_directory'] = dir;
        },
        get_dir: function() {
            return localStorage['image_directory'];
        },
        set_framerate: function() {
            localStorage['framerate'] = framerate;
        },
        get_framerate: function() {
            return localStorage['framerate'];
        }
    }
})

.factory('cameraService', function($http, DjangoCamControllerAPI) {
    return {
        clear_mount: function(ip) {
            var get_pid = $http.get('http://' + ip + ':8000/camera_ops/clear_mount/')
//            var get_pid = $http.get(DjangoCamControllerAPI + '/camera_ops/clear_mount/')
            .then(function(response) {
                var mount_cleared = response.data.result;
                return mount_cleared;
            });
            
            return get_pid;
        },
        take_image: function(ip, dir) {
            var capture_image = $http.get('http://' + ip + ':8000/camera_ops/take_image/?image_dir=' + dir)
//            var capture_image = $http.get(DjangoCamControllerAPI + '/camera_ops/take_image/?image_dir=' + dir)
            .then(function(response) {
                var image_captured = response.data.result;
                return image_captured;
            });
            
            return capture_image;
        },
        compile_preview: function(ip, dir, framerate) {
            var compile_video = $http.get('http://' + ip + ':8000/camera_ops/compile_preview/?image_dir=' + dir + '&framerate=' + framerate)
//            var compile_video = $http.get(DjangoCamControllerAPI + '/camera_ops/compile_preview/?image_dir=' + dir + '&framerate=' + framerate)
            .then(function(response) {
                var movie_compiled = response.data.result;
                return movie_compiled;
            });
            return compile_video;
        }
    }
})