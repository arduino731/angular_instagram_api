var app = angular
    .module('instagramApp', [
    'instagramApp.controllers', 
    'instagramService', 
    'ui.bootstrap', 
    'ui.router', 
    'Authentication',
    'directives', 
    'ngCookies',
    'ui.unique',
    'uiGmapgoogle-maps'
    ]);

app.constant('instagramApiConfig', {
        apiUrl: 'https://api.instagram.com/v1/',
        clientId: '542793a8fad940628066da8035e1098f',
        // callback: 'http://localhost:3000/callback.html'
        callback: 'http://angular-instagram-api.herokuapp.com/callback.html'
        // callback:'https://preview.c9.io/ironheartbj18/angular-instagram-api/public/callback.html?_c9_id=livepreview4'
    }
);


app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    // Redirect any unresolved url
    $urlRouterProvider.otherwise("/index");

    $stateProvider

        .state('index', {
            url: "/index",
            templateUrl: "views/index.html",
            data: {pageTitle: 'HomePage', pageSubTitle: ''},
            controller: "IndexController"
        })

        .state('popular', {
            url: "/popular",
            templateUrl: "views/popular.html",
            data: {pageTitle: 'Popular Images', pageSubTitle: ''},
            controller: "popularController"
        })

        .state("media", {
            url: "/media/:mediaId/:mediaType",
            templateUrl: "views/media.html",
            data: {pageTitle: 'Media', pageSubTitle: ''},
            controller: "mediaController"
        })
        
        .state("user", {
            url: "/user/:userId/:userName",
            templateUrl: "views/user.html",
            data: {pageTitle: 'User', pageSubTitle: ''},
            controller: "userController"
        })

        .state('searchUser', {
            url: "/searchUser",
            templateUrl: "views/searchUser.html",
            data: {pageTitle: 'Search User', pageSubTitle: ''},
            controller: "UserSearchController"
        })
        
        .state('searchTag', {
            url: "/searchTag",
            templateUrl: "views/searchTag.html",
            data: {pageTitle: 'Search Tag', pageSubTitle: ''},
            controller: "searchTagController"
        })
        
        .state("tag", {
            url: "/tag/:tagName",
            templateUrl: "views/tag.html",
            data: {pageTitle: 'Tag', pageSubTitle: ''},
            controller: "tagController"
        })
        
        .state('searchMap', {
            url: "/searchMap",
            templateUrl: "views/searchMap.html",
            data: {pageTitle: 'Search Map', pageSubTitle: ''},
            controller: "searchMapController"
        })
        
        .state("login", {
            url: "/login/:accessToken",
            templateUrl: "views/login.html",
            data: {pageTitle: 'Login', pageSubTitle: ''},
            controller: "loginController"
        })
        
        .state("contact", {
            url: "/contact",
            templateUrl: "views/contact.html",
            data: {pageTitle: 'Contact', pageSubTitle: ''},
            controller: "contactController"
        })
}]);

app.run(["$rootScope", 'AuthenticationService', 'instagramApi', 'instagramApiConfig', '$state', function ($rootScope, AuthenticationService, instagramApi, instagramApiConfig, $state) {

    instagramApi.setCredentials(instagramApiConfig);

    AuthenticationService.start(instagramApi);

    $rootScope.$state = $state;

    $rootScope.errorCodes = instagramApi.errorCodes;

}]);