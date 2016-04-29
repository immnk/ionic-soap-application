angular.module(MEETINGS.APP_NAME, ['ionic','ionic.service.core',  'ionic.service.analytics', MEETINGS.MODULE_NAMES.CONTROLLERS, MEETINGS.MODULE_NAMES.FACTORIES, MEETINGS.MODULE_NAMES.UTILS, MEETINGS.MODULE_NAMES.DIRECTIVES, MEETINGS.MODULE_NAMES.MESSAGES])

.run(function($ionicPlatform, $ionicAnalytics) {
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
                controller: MEETINGS.STATES.SIDE_MENU.controller,
                cache: MEETINGS.STATES.SIDE_MENU.cache
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
