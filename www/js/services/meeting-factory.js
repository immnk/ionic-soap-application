factories.factory(MEETINGS.FACTORIES.MeetingsFactory, MeetingsFactory);

MeetingsFactory.inject = ['$soap', '$q', 'utils'];

function MeetingsFactory($soap, $q, utils) {
    var service = {};

    service.meetingCode = 1;
    service.getMeetingList = getMeetingList;
    service.getMeetingByCode = getMeetingByCode;
    service.getCurrentMeetingCode = getCurrentMeetingCode;
    service.setCurrentMeetingCode = setCurrentMeetingCode;

    function getCurrentMeetingCode(){
        return service.meetingCode;
    }

    function setCurrentMeetingCode(meetingCode){
        service.meetingCode = meetingCode;
    }

    function getMeetingList() {
        var deferred = $q.defer();

        $soap.post(MEETINGS.BACK_END.RootURL, MEETINGS.BACK_END.MethodName.getMeetingList)
            .then(function(response) {
                // utils.Logger.success(response);

                var x2js = new X2JS();
                var aftCnv = x2js.xml_str2json(response);

                if (aftCnv.DataSet.diffgram.NewDataSet) {
                    var meetings = aftCnv.DataSet.diffgram.NewDataSet.Meeting;
                    var result = [];
                    // utils.Logger.debug(meetings);
                    
                    for (i = 0; i < meetings.length; i++) {
                        var temp = meetings[i];
                        var meeting = {};

                        meeting.id = temp.MeetingCode ? parseInt(temp.MeetingCode) : utils.MEETINGS_MESSAGES.NOT_APPLICABLE;
                        meeting.meetNumber = temp.MeetingNumber ? temp.MeetingNumber : utils.MEETINGS_MESSAGES.NOT_APPLICABLE;
                        meeting.subject = temp.Subject ? temp.Subject : utils.MEETINGS_MESSAGES.NOT_APPLICABLE;
                        meeting.meetingTime = temp.MeetingTime ? utils.formatDate(temp.MeetingTime) : utils.MEETINGS_MESSAGES.NOT_APPLICABLE;
                        meeting.venue = temp.Venue ? temp.Venue : utils.MEETINGS_MESSAGES.NOT_APPLICABLE;
                        meeting.statusCode = temp.MeetingStatusCode ? temp.MeetingStatusCode : utils.MEETINGS_MESSAGES.NOT_APPLICABLE;
                        meeting.subscriptionCode = temp.SubscriptionCode ? temp.SubscriptionCode : utils.MEETINGS_MESSAGES.NOT_APPLICABLE;
                        meeting.createdUserCode = temp.CreatedUserCode ? temp.CreatedUserCode : utils.MEETINGS_MESSAGES.NOT_APPLICABLE;
                        meeting.statusName = temp.MeetingStatusName ? temp.MeetingStatusName : utils.MEETINGS_MESSAGES.NOT_APPLICABLE;
                        meeting.createdTime = temp.CreatedDateTime ? utils.formatDate(temp.CreatedDateTime) : utils.MEETINGS_MESSAGES.NOT_APPLICABLE;
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

    function getMeetingByCode(meetingCode) {
        var deferred = $q.defer();

        var parameters = {
            MeetingCode: meetingCode
        };
        $soap.post(MEETINGS.BACK_END.RootURL, MEETINGS.BACK_END.MethodName.getMeetingByMeetingCode, parameters)
            .then(function(response) {
                
                var x2js = new X2JS();
                var aftCnv = x2js.xml_str2json(response);

                if(aftCnv.DataSet.diffgram.NewDataSet){
                    var meetingDetail = aftCnv.DataSet.diffgram.NewDataSet;
                    var result = {};
                    utils.Logger.debug(meetingDetail);

                    if(meetingDetail.Agenda){
                        if(meetingDetail.Agenda.constructor === Array){
                            result.Agenda = meetingDetail.Agenda;
                        }else{
                            result.Agenda = [];
                            result.Agenda.push(meetingDetail.Agenda);
                        }
                    } else{
                        result.Agenda = [];
                    }

                    if(meetingDetail.Minutes){
                        if(meetingDetail.Minutes.constructor === Array){
                            result.Minutes = meetingDetail.Minutes;
                        }else{
                            result.Minutes = [];
                            result.Minutes.push(meetingDetail.Minutes);
                        }
                    } else{
                        result.Minutes = [];
                    }

                    result.Meeting = meetingDetail.Meeting ? meetingDetail.Meeting : {};
                    result.MeetingExternalUser = meetingDetail.MeetingExternalUser ? meetingDetail.MeetingExternalUser : {};
                    
                    if(meetingDetail.MeetingParticipant){
                        if(meetingDetail.MeetingParticipant.constructor === Array){
                            result.MeetingParticipant = meetingDetail.Minutes;
                        }else{
                            result.MeetingParticipant = [];
                            result.MeetingParticipant.push(meetingDetail.Minutes);
                        }
                    } else{
                        result.MeetingParticipant = [];
                    }

                    utils.Logger.success(result);
                    deferred.resolve(result);
                } else{
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
