factories.factory(MEETINGS.FACTORIES.MeetingsFactory, MeetingsFactory);

MeetingsFactory.inject = ['$soap', '$q', 'utils'];

function MeetingsFactory($soap, $q, utils) {
    var service = {};

    service.getMeetingList = getMeetingList;

    function getMeetingList() {
        var deferred = $q.defer();

        $soap.post(MEETINGS.BACK_END.RootURL, MEETINGS.BACK_END.MethodName.getMeetingList)
            .then(function(response) {
            	utils.Logger.success(response);

                var x2js = new X2JS();
                var aftCnv = x2js.xml_str2json(response);
                
                if (aftCnv.DataSet) {
                    var meetings = aftCnv.DataSet.diffgram.NewDataSet.Meeting;
                    utils.Logger.debug(meetings);

                    var result = [];
                    for(i = 0; i<meetings.length; i++){
                        var temp = meetings[i];
                        var meeting = {};

                        meeting.id = temp.MeetingCode ? temp.MeetingCode : utils.MEETINGS_MESSAGES.NOT_APPLICABLE;
                        meeting.meetNumber = temp.MeetingNumber ? temp.MeetingNumber : utils.MEETINGS_MESSAGES.NOT_APPLICABLE;
                        meeting.subject = temp.Subject ? temp.Subject : utils.MEETINGS_MESSAGES.NOT_APPLICABLE;
                        meeting.meetingTime = temp.MeetingTime ? utils.formatDate(temp.MeetingTime) : utils.MEETINGS_MESSAGES.NOT_APPLICABLE;
                        meeting.venue = temp.Venue ? temp.Venue : utils.MEETINGS_MESSAGES.NOT_APPLICABLE;
                        meeting.statusCode = temp.MeetingStatusCode ? temp.MeetingStatusCode : utils.MEETINGS_MESSAGES.NOT_APPLICABLE;
                        meeting.subscriptionCode = temp.SubscriptionCode ? temp.SubscriptionCode : utils.MEETINGS_MESSAGES.NOT_APPLICABLE;
                        meeting.createdUserCode = temp.CreatedUserCode ? temp.CreatedUserCode : utils.MEETINGS_MESSAGES.NOT_APPLICABLE;
                        meeting.statusName = temp.MeetingStatusName ? temp.MeetingStatusName : utils.MEETINGS_MESSAGES.NOT_APPLICABLE;
                        meeting.createdTime = temp.CreatedDateTime ? utils.formatDate( temp.CreatedDateTime ) : utils.MEETINGS_MESSAGES.NOT_APPLICABLE;
                        meeting.projectCode = temp.ProjectCode ? temp.ProjectCode : utils.MEETINGS_MESSAGES.NOT_APPLICABLE;
                        meeting.name = temp.MeetingName ? temp.MeetingName : utils.MEETINGS_MESSAGES.NOT_APPLICABLE;

                        result.push(meeting);
                    }

                    utils.Logger.debug(result);

                    deferred.resolve(result);
                } else {
                    utils.Logger.error(aftCnv);
                    deferred.reject('Invalid response');
                }
            }, function(error) {
                deferred.reject(error);
            });

        return deferred.promise;
    }

    return service;
}
