factories.factory(MEETINGS.FACTORIES.SoundsFactory, SoundsFactory);

SoundsFactory.inject = ['$q', 'utils'];

function SoundsFactory() {
    var deleteSound = function(x) {
        console.log("calling deleteSound");
        var deferred = $q.defer();
        getSounds().then(function(sounds) {
            sounds.splice(x, 1);
            utils.localStorage.setObject(utils.MEETINGS_MESSAGES.SOUNDS_KEY, sounds);
            deferred.resolve();
        });

        return deferred.promise;

    }

    var getSounds = function() {
        var deferred = $q.defer();
        var sounds = [];


        sounds = utils.localStorage.getObject(utils.MEETINGS_MESSAGES.SOUNDS_KEY);

        deferred.resolve(sounds);

        return deferred.promise;
    }

    var playSound = function(x) {
        getSounds().then(function(sounds) {
            var sound = sounds[x];

            /*
            Ok, so on Android, we just work.
            On iOS, we need to rewrite to ../Library/NoCloud/FILE'
            */
            var mediaUrl = sound.file;
            if (device.platform.indexOf("iOS") >= 0) {
                mediaUrl = "../Library/NoCloud/" + mediaUrl.split("/").pop();
            }
            var media = new Media(mediaUrl, function(e) {
                media.release();
            }, function(err) {
                utils.Logger.error("media err" + err);

                // console.log("media err", err);
            });
            media.play();
        });
    }

    var saveSound = function(s) {
        console.log("calling saveSound");
        var deferred = $q.defer();
        getSounds().then(function(sounds) {
            sounds.push(s);
            utils.localStorage.setObject(utils.MEETINGS_MESSAGES.SOUNDS_KEY, sounds);
            // localStorage.mysoundboard = JSON.stringify(sounds);
            deferred.resolve();
        });

        return deferred.promise;
    }

    return {
        get: getSounds,
        save: saveSound,
        delete: deleteSound,
        play: playSound
    };
}
