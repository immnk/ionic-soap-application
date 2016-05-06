controllers.controller(MEETINGS.CONTROLLERS.ConductMeetingController, ConductMeetingController);

ConductMeetingController.inject = ['$scope', 'utils'];

function ConductMeetingController($scope, utils) {
    $scope.record = {};

    var captureError = function(e) {
        utils.Logger.error(e);
    }

    var captureSuccess = function(e) {
        utils.Logger.success(e);
        console.dir(e);
        $scope.record.file = e[0].localURL;
        $scope.record.filePath = e[0].fullPath;
    }

    $scope.startrecording = function() {
        navigator.device.capture.captureAudio(
            captureSuccess, captureError, { duration: 10 });
    }

    $scope.play = function() {
        if (!$scope.record.file) {
            navigator.notification.alert("Record a sound first.", null, "Error");
            return;
        }
        var media = new Media($scope.sound.file, function(e) {
            media.release();
        }, function(err) {
            utils.Logger.error(err);
        });
        media.play();
    }
}
