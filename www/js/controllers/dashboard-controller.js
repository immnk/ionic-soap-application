controllers.controller(MEETINGS.CONTROLLERS.DashboardController, DashboardController);

DashboardController.inject = ['$scope', 'utils', MEETINGS.FACTORIES.MeetingsFactory];

function DashboardController($scope, utils, MeetingsFactory){

	$scope.meetings = [];

	MeetingsFactory.getMeetingList().then(function(response){
		// utils.Logger.debug(response);
		$scope.meetings = response;
	})
}