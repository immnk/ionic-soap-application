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

    function navigateState(meetingId) {
        MeetingsFactory.setCurrentMeetingCode(meetingId);
        $state.go(MEETINGS.STATES.DETAIL.name);
    }
}

function MeetingDetailController($scope, utils, MeetingsFactory) {

    $scope.meeting = {};

    $scope.init = init;
    $scope.init();

    function init() {
        utils.Logger.debug(MEETINGS.CONTROLLERS.MeetingDetailController + ' - : init');
        // utils.showSpinner();
        
        $scope.meeting.subject = "Meeting detail";
        var meetingCode = MeetingsFactory.getCurrentMeetingCode();

        utils.Logger.debug(MEETINGS.CONTROLLERS.MeetingDetailController + ' - : init - meetingId - ' + meetingCode);
        
        MeetingsFactory.getMeetingByCode(meetingCode).then(function(response) {
            $scope.meeting.content = response;
            // utils.hideSpinner();
            utils.Logger.debug(MEETINGS.CONTROLLERS.MeetingDetailController + ' - got meeting details.');
        }, function(error) {
            utils.Logger.debug(MEETINGS.CONTROLLERS.MeetingDetailController + ' - error in getting meeting details');
            // utils.hideSpinner();
            utils.showAlert(utils.MEETINGS_MESSAGES.NETWORK_ERROR, error);
        });
    }

}
