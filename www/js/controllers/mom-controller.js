controllers.controller(MEETINGS.CONTROLLERS.MOMController, MOMController);

MOMController.inject = ['$scope', 'utils'];

function MOMController($scope, utils) {
    // $scope.record = recordAudio;

    // function recordAudio() {
    //     // capture callback
    //     var captureSuccess = function(mediaFiles) {
    //         var i, path, len;
    //         for (i = 0, len = mediaFiles.length; i < len; i += 1) {
    //             path = mediaFiles[i].fullPath;
    //             // do something interesting with the file
    //         }
    //     };

    //     // capture error callback
    //     var captureError = function(error) {
    //         navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
    //     };

    //     // start audio capture
    //     navigator.device.capture.captureAudio(captureSuccess, captureError, { limit: 1 });
    // }
}
