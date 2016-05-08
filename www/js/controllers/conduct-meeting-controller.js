controllers.controller(MEETINGS.CONTROLLERS.ConductMeetingController, ConductMeetingController);

ConductMeetingController.inject = ['$scope', 'utils', MEETINGS.FACTORIES.SoundsFactory];

function ConductMeetingController($scope, utils, Sounds) {
    $scope.sound = {
        name: ""
    };

    var captureError = function(e) {
        utils.Logger.error(e);
    }

    var captureSuccess = function(e) {
        utils.Logger.success(e);
        console.dir(e);
        $scope.sound.file = e[0].localURL;
        $scope.sound.filePath = e[0].fullPath;
    }

    $scope.startrecording = function() {
        navigator.device.capture.captureAudio(
            captureSuccess, captureError, { duration: 10 });
    }

    $scope.play = function() {
        if (!$scope.sound.file) {
            utils.showAlert(utils.MEETINGS_MESSAGES.PLAY_ERROR,
                utils.MEETINGS_MESSAGES.RECORD_SOUND_ERROR);
            return;
        }

        var media = new Media($scope.sound.file, function(e) {
            media.release();
        }, function(err) {
            utils.Logger.error(err);
        });
        media.play();
    }

    $scope.save = function() {
        console.log('trying to save ' + $scope.sound.name);

        //Simple error checking
        if ($scope.sound.name === "") {
            navigator.notification.alert("Name this sound first.", null, "Error");
            return;
        }

        if (!$scope.sound.file) {
            navigator.notification.alert("Record a sound first.", null, "Error");
            return;
        }

        /*
        begin the copy to persist location
        
        first, this path below is persistent on both ios and and
        */
        var loc = cordova.file.dataDirectory;
        /*
        but now we have an issue with file name. so let's use the existing extension, 
        but a unique filename based on seconds since epoch
        */
        var extension = $scope.sound.file.split(".").pop();
        var filepart = Date.now();
        var filename = filepart + "." + extension;
        console.log("new filename is " + filename);

        window.resolveLocalFileSystemURL(loc, function(d) {
            window.resolveLocalFileSystemURL($scope.sound.file, function(fe) {
                fe.copyTo(d, filename, function(e) {
                    console.log('success inc opy');
                    console.dir(e);
                    $scope.sound.file = e.nativeURL;
                    $scope.sound.path = e.fullPath;

                    Sounds.save($scope.sound).then(function() {
                        $ionicHistory.nextViewOptions({
                            disableBack: true
                        });
                        $state.go("home");
                    });

                }, function(e) {
                    console.log('error in coipy');
                    console.dir(e);
                });
            }, function(e) {
                console.log("error in inner bullcrap");
                console.dir(e);
            });


        }, function(e) {
            console.log('error in fs');
            console.dir(e);
        });

    }
}
