var MEETINGS = {
    APP_NAME: "meetings",
    MESSAGES: "MEETINGS_MESSAGES",
    DATAFORMAT: "MMM Do YYYY, h:mm:ss A",
    MODULE_NAMES: {
        CONTROLLERS: "meetings.controllers",
        FACTORIES: "meetings.factories",
        DIRECTIVES: "meetings.directives",
        UTILS: "meetings.utils",
        MESSAGES: "meetings.messages",
        LOGGER: "Logger",
        LOCAL_STORAGE: "LocalStorage"
    },
    CONTROLLERS: {
        DashboardController: "DashboardController",
        SideMenuController: "SideMenuController",
        MeetingsController: "MeetingsController",
        MeetingDetailController: "MeetingDetailController",
        MOMController: "MOMController",
        AgendaController: "AgendaController",
        AboutUsController: "AboutUsController"
    },
    FACTORIES: {
        MeetingsFactory: "MeetingsFactory",
        Logger: "Logger",
        LocalStorage: "LocalStorage"
    },
    STATES: {
        SIDE_MENU: {
            name: 'app',
            url: '/app',
            templateUrl: 'templates/menu.html',
            controller: 'SideMenuController'
        },
        DASHBOARD: {
            name: 'app.dashboard',
            url: '/dashboard',
            templateUrl: 'templates/dashboard.html',
            controller: 'DashboardController'
        },
        MEETINGS: {
            name: 'app.meetings',
            url: '/meetings',
            templateUrl: 'templates/meeting-list.html',
            controller: 'MeetingsController'
        },
        MEETINGDETAIL: {
            name: 'app.meetingDetail',
            url: '/{meetingId:int}',
            templateUrl: 'templates/meeting-detail.html',
            controller: 'MeetingDetailController'
        },
        MOM: {
            name: 'app.mom',
            url: '/mom',
            templateUrl: 'templates/mom.html',
            controller: 'MOMController'
        },
        AGENDA: {
            name: 'app.agenda',
            url: '/agenda',
            templateUrl: 'templates/agenda.html',
            controller: 'AgendaController'
        },
        ABOUTUS: {
            name: 'app.aboutus',
            url: '/aboutus',
            templateUrl: 'templates/aboutus.html',
            controller: 'AboutUsController'
        }
    },
    BACK_END: {
        RootURL: "http://45.118.182.64/Boardmeeting/BMmeeting.asmx",
        MethodName: {
            "getMeetingList": "GetMeetingList",
            "getMeetingByMeetingCode": "GetMeetingByMeetingCode"
        },
        RequestType: {
            GET: "GET",
            POST: "POST"
        },
        ResponseType: {
            SUCCESS: "success",
            ERROR: "error"
        },
        ERROR_CODES: {
            NETWORK_ERROR: "NETWORK_ERROR",
            UNAUTHORIZED: "UNAUTHORIZED"
        }
    },
    LOCAL_STORAGE: {
        KEYS: {
            USER: "USER",
        }
    }
};

var controllers = angular.module(MEETINGS.MODULE_NAMES.CONTROLLERS, []);
var factories = angular.module(MEETINGS.MODULE_NAMES.FACTORIES, ['angularSoap']);
var directives = angular.module(MEETINGS.MODULE_NAMES.DIRECTIVES, []);
var utils = angular.module(MEETINGS.MODULE_NAMES.UTILS, [MEETINGS.MODULE_NAMES.LOGGER, MEETINGS.MODULE_NAMES.LOCAL_STORAGE]);
var messages = angular.module(MEETINGS.MODULE_NAMES.MESSAGES, []);
var logger = angular.module(MEETINGS.MODULE_NAMES.LOGGER, []);
var localStorage = angular.module(MEETINGS.MODULE_NAMES.LOCAL_STORAGE, []);
