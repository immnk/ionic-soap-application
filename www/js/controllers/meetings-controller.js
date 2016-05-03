controllers.controller(MEETINGS.CONTROLLERS.MeetingsController, MeetingsController);
controllers.controller(MEETINGS.CONTROLLERS.MeetingDetailController, MeetingDetailController);

MeetingsController.inject = ['$scope', 'utils', '$state', MEETINGS.FACTORIES.MeetingsFactory];
MeetingDetailController.inject = ['$scope', 'utils', '$stateParams', MEETINGS.FACTORIES.MeetingsFactory];

function MeetingsController($scope, utils, $state, MeetingsFactory) {

init();

    $scope.meetings = [];
    $scope.navigateState = navigateState;

    function init() {
    	utils.Logger.debug(MEETINGS.CONTROLLERS.MeetingsController + ' - : init');
        utils.showSpinner();
        
        MeetingsFactory.getMeetingList().then(function(response) {
            utils.hideSpinner();
            $scope.meetings = response;
        }, function(error) {
            utils.hideSpinner();
            utils.showAlert(utils.MEETINGS_MESSAGES.NETWORK_ERROR, error);
        });
    }

    function navigateState(meetingId){
        MeetingsFactory.setCurrentMeetingCode(meetingId);
        $state.go(MEETINGS.STATES.DETAIL.name);
    }
}

function MeetingDetailController($scope, utils, $stateParams, MeetingsFactory) {

    $scope.meeting = {};

    init();

    function init() {
        utils.Logger.debug(MEETINGS.CONTROLLERS.MeetingDetailController + ' - : init');
        $scope.meeting.subject = "Meeting detail";
        var meetingCode = MeetingsFactory.getCurrentMeetingCode();

        utils.Logger.debug(MEETINGS.CONTROLLERS.MeetingDetailController + ' - : init - meetingId' + meetingCode);
        utils.showSpinner();

        MeetingsFactory.getMeetingByCode(meetingCode).then(function(response) {
        	utils.hideSpinner();
            $scope.meeting.content = response;
        }, function(error){
        	utils.hideSpinner();
        	utils.showAlert(utils.MEETINGS_MESSAGES.NETWORK_ERROR, error);
        });
    }

}
