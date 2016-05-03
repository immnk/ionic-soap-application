controllers.controller(MEETINGS.CONTROLLERS.DetailTabController, DetailTabController);

DetailTabController.inject = ['$scope'];

function DetailTabController($scope){
	$scope.meeting = {
		content: {
			Meeting: {
				
			}
		}
	};
	$scope.meet = $scope.meeting.content.Meeting;
}