controllers.controller(MEETINGS.CONTROLLERS.MeetingsController, MeetingsController);

MeetingsController.inject = ['$scope', 'utils', MEETINGS.FACTORIES.MeetingsFactory];

function MeetingsController($scope, utils, MeetingsFactory){

	$scope.meetings = [];

	MeetingsFactory.getMeetingList().then(function(response){
		$scope.meetings = response;
	})
}

controllers.controller(MEETINGS.CONTROLLERS.MeetingDetailController, MeetingDetailController);

MeetingDetailController.inject = ['$scope', 'utils', MEETINGS.FACTORIES.MeetingsFactory];

function MeetingDetailController($scope, utils, MeetingsFactory){

	$scope.meeting = {};

}