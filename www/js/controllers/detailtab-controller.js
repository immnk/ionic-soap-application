controllers.controller(MEETINGS.CONTROLLERS.DetailTabController, DetailTabController);

DetailTabController.inject = ['$scope', 'utils'];

function DetailTabController($scope, utils){
	utils.Logger.debug(MEETINGS.CONTROLLERS.DetailTabController + " - init");
}