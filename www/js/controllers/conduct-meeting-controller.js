controllers.controller(MEETINGS.CONTROLLERS.ConductMeetingController, ConductMeetingController);

ConductMeetingController.inject = ['$scope', 'utils', '$cordovaFile',
    MEETINGS.FACTORIES.SoundsFactory
];

function ConductMeetingController($scope, utils, $cordovaFile, SoundsFactory) {
    $scope.sound = {
        name: "sample",
        started: false
    };

    // var captureError = function(e) {
    //     console.dir(e);
    //     utils.Logger.error(e);
    //     utils.Logger.error(typeof(e));
    //     if (e.indexOf("No Activity found to handle Intent") == -1) {
    //         utils.showAlert(utils.MEETINGS_MESSAGES.APP_NOT_FOUND_KEY,
    //             utils.MEETINGS_MESSAGES.APP_NOT_FOUND_MESSAGE);
    //     }

    // }

    // var captureSuccess = function(e) {
    //     utils.Logger.success(e);
    //     console.dir(e);
    //     $scope.sound.file = e[0].localURL;
    //     $scope.sound.filePath = e[0].fullPath;
    // }

    // $scope.startrecording = function() {
    //     navigator.device.capture.captureAudio(
    //         captureSuccess, captureError, { duration: 10 });
    // }

    // $scope.play = function() {
    //     if (!$scope.sound.file) {
    //         utils.showAlert(utils.MEETINGS_MESSAGES.PLAY_ERROR,
    //             utils.MEETINGS_MESSAGES.RECORD_SOUND_ERROR);
    //         return;
    //     }

    //     var media = new Media($scope.sound.file, function(e) {
    //         media.release();
    //     }, function(err) {
    //         utils.Logger.error(err);
    //     });
    //     media.play();
    // }

    // $scope.save = function() {
    //     console.log('trying to save ' + $scope.sound.name);

    //     //Simple error checking
    //     if ($scope.sound.name === "") {
    //         navigator.notification.alert("Name this sound first.", null, "Error");
    //         return;
    //     }

    //     if (!$scope.sound.file) {
    //         navigator.notification.alert("Record a sound first.", null, "Error");
    //         return;
    //     }

    //     /*
    //     begin the copy to persist location

    //     first, this path below is persistent on both ios and and
    //     */
    //     var loc = cordova.file.dataDirectory;
    //     /*
    //     but now we have an issue with file name. so let's use the existing extension, 
    //     but a unique filename based on seconds since epoch
    //     */
    //     var extension = $scope.sound.file.split(".").pop();
    //     var filepart = Date.now();
    //     var filename = filepart + "." + extension;
    //     console.log("new filename is " + filename);

    //     window.resolveLocalFileSystemURL(loc, function(d) {
    //         window.resolveLocalFileSystemURL($scope.sound.file, function(fe) {
    //             fe.copyTo(d, filename, function(e) {
    //                 console.log('success inc opy');
    //                 console.dir(e);
    //                 $scope.sound.file = e.nativeURL;
    //                 $scope.sound.path = e.fullPath;

    //                 SoundsFactory.save($scope.sound).then(function() {
    //                     $ionicHistory.nextViewOptions({
    //                         disableBack: true
    //                     });
    //                     $state.go("home");
    //                 });

    //             }, function(e) {
    //                 console.log('error in coipy');
    //                 console.dir(e);
    //             });
    //         }, function(e) {
    //             console.log("error in inner bullcrap");
    //             console.dir(e);
    //         });


    //     }, function(e) {
    //         console.log('error in fs');
    //         console.dir(e);
    //     });

    // }

    $scope.stoprecording = function() {
        $scope.sound.started = false;
        window.plugins.audioRecorderAPI.stop(function(savedFilePath) {
            // success
            // utils.Logger.success(msg);
            // utils.Logger.debug('temp file location: ' + savedFilePath);
            var fileName = savedFilePath.split('/')[savedFilePath.split('/').length - 1];
            var directory;
            if (cordova.file.documentsDirectory) {
                directory = cordova.file.documentsDirectory; // for iOS
            } else {
                directory = cordova.file.externalApplicationStorageDirectory; // for Android
            }
            utils.Logger.debug('directory: ' + directory);
            var newFileName = $scope.sound.name + moment().format() + ".m4a";

            $cordovaFile.copyFile(
                    cordova.file.dataDirectory, fileName,
                    directory
                )
                .then(function(success) {
                    utils.Logger.success(success);
                    utils.showAlert(utils.MEETINGS_MESSAGES.SUCCESS_TITLE,
                        utils.MEETINGS_MESSAGES.RECORD_SOUND_SUCCESS + success.fullPath);
                }, function(error) {
                    utils.Logger.error(error);
                    utils.showAlert(utils.MEETINGS_MESSAGES.RECORD_ERROR,
                        utils.MEETINGS_MESSAGES.RECORD_SOUND_ERROR);
                });
        }, function(msg) {
            // failed
            utils.Logger.error(msg);
        });
    }

    $scope.startrecording = function() {

        // Simple error checking
        if ($scope.sound.name === "") {
            navigator.notification.alert("Name this sound first.", null, "Error");
            return;
        }

        $scope.sound.started = true;

        window.plugins.audioRecorderAPI.record(function(savedFilePath) {
            utils.Logger.debug('temp file location: ' + savedFilePath);
            var fileName = savedFilePath.split('/')[savedFilePath.split('/').length - 1];
            var directory;
            if (cordova.file.documentsDirectory) {
                directory = cordova.file.documentsDirectory; // for iOS
            } else {
                directory = cordova.file.externalRootDirectory; // for Android
            }
            utils.Logger.debug('directory: ' + directory);
            var newFileName = $scope.sound.name + moment().format() + ".m4a";

            $cordovaFile.copyFile(
                    cordova.file.dataDirectory, fileName,
                    directory, newFileName
                )
                .then(function(success) {
                    utils.Logger.success(success);
                    utils.showAlert(utils.MEETINGS_MESSAGES.SUCCESS_TITLE,
                        utils.MEETINGS_MESSAGES.RECORD_SOUND_SUCCESS + success.fullPath);
                }, function(error) {
                    utils.Logger.error(error);
                    utils.showAlert(utils.MEETINGS_MESSAGES.RECORD_ERROR,
                        utils.MEETINGS_MESSAGES.RECORD_SOUND_ERROR);
                });
            $scope.sound.started = false;
        }, function(msg) {
            // alert('ko: ' + msg);
            $scope.sound.started = false;
            utils.Logger.error(error);
            utils.showAlert(utils.MEETINGS_MESSAGES.RECORD_ERROR,
                utils.MEETINGS_MESSAGES.RECORD_SOUND_ERROR);
        }, 3000); // record for 300000 seconds
    }

    $scope.playrecording = function() {
        window.plugins.audioRecorderAPI.playback(function(msg) {
            // complete
            utils.Logger.success(msg);
            utils.showAlert(utils.MEETINGS_MESSAGES.SUCCESS_TITLE,
                "Playback of the recording is finished.");
        }, function(msg) {
            // failed
            utils.Logger.error(msg);
            utils.showAlert(utils.MEETINGS_MESSAGES.PLAY_ERROR,
                utils.MEETINGS_MESSAGES.PLAY_SOUND_ERROR);
        });
    }
}
