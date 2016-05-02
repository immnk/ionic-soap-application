controllers.controller(MEETINGS.CONTROLLERS.MeetingsController, MeetingsController);

MeetingsController.inject = ['$scope', 'utils', '$state', MEETINGS.FACTORIES.MeetingsFactory];

function MeetingsController($scope, utils, $state, MeetingsFactory){

	$scope.meetings = [];
	// $scope.navigateState = navigateState;

	MeetingsFactory.getMeetingList().then(function(response){
		$scope.meetings = response;
	});
}

controllers.controller(MEETINGS.CONTROLLERS.MeetingDetailController, MeetingDetailController);

MeetingDetailController.inject = ['$scope', 'utils', '$stateParams', MEETINGS.FACTORIES.MeetingsFactory];

function MeetingDetailController($scope, utils, $stateParams, MeetingsFactory){

	$scope.meeting = {};

	init();

	function init(){
		$scope.meeting.subject = "Meeting detail";

		console.log($stateParams.meetingId);
		var meetingCode = $stateParams.meetingId;
		MeetingsFactory.getMeetingByCode(meetingCode).then(function(response){
			$scope.meeting.content = response;
		})
	}

}