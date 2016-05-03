controllers.controller(MEETINGS.CONTROLLERS.DashboardController, DashboardController);

DashboardController.inject = ['$scope', 'utils'];

function DashboardController($scope, utils){

	$scope.states = [{
		name: 'My Meeting',
		state: MEETINGS.STATES.MEETINGS.name,
		icon: 'fi-calendar'
	}, {
		name: 'Conduct Meeting',
		state: MEETINGS.STATES.CONDUCT.name,
		icon: 'fi-microphone'
	}];
	// , {
	// 	name: 'View MOM',
	// 	state: MEETINGS.STATES.MOM.name,
	// 	icon: 'fi-clipboard-notes'
	// }, {
	// 	name: 'View Agenda',
	// 	state: MEETINGS.STATES.AGENDA.name,
	// 	icon: 'fi-address-book'
	// }];
}