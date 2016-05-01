angular.module(MEETINGS.APP_NAME, ['ionic','ionic.service.core',  'ionic.service.analytics', MEETINGS.MODULE_NAMES.CONTROLLERS, MEETINGS.MODULE_NAMES.FACTORIES, MEETINGS.MODULE_NAMES.UTILS, MEETINGS.MODULE_NAMES.DIRECTIVES, MEETINGS.MODULE_NAMES.MESSAGES])

.run(function($ionicPlatform, $ionicAnalytics, utils) {
    $ionicPlatform.ready(function() {
        $ionicAnalytics.register();
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
        utils.init();
    });
})

.config(['$stateProvider', '$urlRouterProvider', '$compileProvider', '$logProvider',
    function($stateProvider, $urlRouterProvider, $compileProvider, $logProvider) {

        $stateProvider
            .state(MEETINGS.STATES.SIDE_MENU.name, {
                url: MEETINGS.STATES.SIDE_MENU.url,
                abstract: true,
                templateUrl: MEETINGS.STATES.SIDE_MENU.templateUrl,
                controller: MEETINGS.STATES.SIDE_MENU.controller
            })
            .state(MEETINGS.STATES.DASHBOARD.name, {
                url: MEETINGS.STATES.DASHBOARD.url,
                views: {
                    'menuContent': {
                        templateUrl: MEETINGS.STATES.DASHBOARD.templateUrl,
                        controller: MEETINGS.STATES.DASHBOARD.controller
                    }
                }
            })
            .state(MEETINGS.STATES.MEETINGS.name, {
                url: MEETINGS.STATES.MEETINGS.url,
                views: {
                    'menuContent': {
                        templateUrl: MEETINGS.STATES.MEETINGS.templateUrl,
                        controller: MEETINGS.STATES.MEETINGS.controller
                    }
                }
            })
            .state(MEETINGS.STATES.MEETINGDETAIL.name, {
                url: MEETINGS.STATES.MEETINGDETAIL.url,
                views: {
                    'menuContent': {
                        templateUrl: MEETINGS.STATES.MEETINGDETAIL.templateUrl,
                        controller: MEETINGS.STATES.MEETINGDETAIL.controller
                    }
                }
            })
            .state(MEETINGS.STATES.MOM.name, {
                url: MEETINGS.STATES.MOM.url,
                views: {
                    'menuContent': {
                        templateUrl: MEETINGS.STATES.MOM.templateUrl,
                        controller: MEETINGS.STATES.MOM.controller
                    }
                }
            })
            .state(MEETINGS.STATES.AGENDA.name, {
                url: MEETINGS.STATES.AGENDA.url,
                views: {
                    'menuContent': {
                        templateUrl: MEETINGS.STATES.AGENDA.templateUrl,
                        controller: MEETINGS.STATES.AGENDA.controller
                    }
                }
            })
            .state(MEETINGS.STATES.ABOUTUS.name, {
                url: MEETINGS.STATES.ABOUTUS.url,
                views: {
                    'menuContent': {
                        templateUrl: MEETINGS.STATES.ABOUTUS.templateUrl,
                        controller: MEETINGS.STATES.ABOUTUS.controller
                    }
                }
            });

        $urlRouterProvider.otherwise(MEETINGS.STATES.SIDE_MENU.url + MEETINGS.STATES.DASHBOARD.url);
        $compileProvider.debugInfoEnabled(false);
        $logProvider.debugEnabled(true);
    }
]);
