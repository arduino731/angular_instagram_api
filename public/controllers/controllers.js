angular
	
	.module('instagramApp.controllers', [])

    .controller('AppController', ['$rootScope','$scope','$state','AuthenticationService','instagramApi', function($rootScope, $scope, $state, AuthenticationService, instagramApi){

    //common variables
    // $rootScope.authLink = AuthenticationService.getAuthLink();

    // if($rootScope.globals.currentUser) {

    //     AuthenticationService.getRequestedBy(function(response){

    //         $scope.serviceMeta = response.meta;

    //         $rootScope.userRequests = response.data;

    //     });

    // }
	}])

    .controller('navController', ['$scope', 'AuthenticationService', '$location', function($scope, AuthenticationService, $location){
        $scope.isLoggedIn = function(){
    		if(AuthenticationService.isLoggedIn()){
	    		$scope.user = AuthenticationService.getCurrentUser();
	    		return true;
		    	}else{
		    		return false;
		    	}
		}
		
// 		$scope.signOut = function(){

//         AuthenticationService.ClearCredentials();

//         $location.path("/#");

//         };
    
//         $scope.refresh = function(){
    
//             AuthenticationService.getUserSelf();
    
//         };
    }])
    
    .controller('IndexController', ['$scope', 'instagramApi', function($scope, instagramApi){
    
    }])
    
    .controller('popularController', ['$scope', 'instagramApi', function($scope, instagramApi){
        $scope.layout = 'grid';
        
        $scope.setLayout = function (layout) {
            $scope.layout = layout;
        };
    
        $scope.isLayout = function (layout) {
            return $scope.layout == layout;
        };
        
        
        $scope.serviceMeta = {};

        $scope.popularImages = [];
        
        $scope.refresh = function(){
            instagramApi.fetchPopular(function(response){
                console.log(response);
                $scope.serviceMeta = response.meta;
                $scope.popularImages = response.data;
            })
        }
    }])
    
    .controller('mediaController', ['$scope','$stateParams','instagramApi', function($scope, $stateParams, instagramApi){
        $scope.mediaId = $stateParams.mediaId;
        $scope.mediaType = "";
        $scope.serviceMeta = {};
        
        $scope.getMedia = function(){

        instagramApi.getMedia($scope.mediaId, function (response) {

            $scope.serviceMeta = response.meta;

            $scope.media = response.data;

            if($scope.media.location) {

                $scope.map = {

                center:{latitude: $scope.media.location.latitude, longitude: $scope.media.location.longitude },

                zoom: 19,

                options : {

                        mapTypeId : 'satellite'

                    }

                };

                $scope.marker = {
                    id: 0,
                    coords: {
                        latitude: $scope.media.location.latitude,
                        longitude: $scope.media.location.longitude
                    }
                };

            }

            instagramApi.getComments($scope.mediaId, function(response){

                $scope.media.comments.data = response.data;

            });

        });

    };
        
    }])
    
    .controller('userController', ['$scope', 'instagramApi', '$stateParams', function ($scope, instagramApi, $stateParams){
        // comment if( $scope.isLoggedIn() && !$scope.isOwn() 
        
        $scope.setLayout = function (layout) {
            $scope.layout = layout;
            $scope.nextIterator = false;
        };
    
        $scope.isLayout = function (layout) {
            return $scope.layout == layout;
        };
        $scope.userId = $stateParams.userId;
        $scope.userName = $stateParams.userName;
        
        $scope.serviceMeta = {};
        
        $scope.images = [];
        $scope.follows = [];
        $scope.followedBy = [];
        $scope.usedNextIterators = [];
        $scope.iterators = [];
        
        $scope.getUserProfile = function(){
            instagramApi.getUser($scope.userId, function(response){
                $scope.serviceMeta = response.meta;
                if ($scope.serviceMeta.code == 200 ){
                    $scope.user = response.data;
                    $scope.getRecentMedia();
                    
                //     if( $scope.isLoggedIn() && !$scope.isOwn() ){

                //     instagramApi.relationship($scope.user.id, 'relationship', function(data) {

                //         $scope.relationshipData = {};

                //         if(data.data.outgoing_status == "follows"){

                //             $scope.relationshipData.following = true;

                //         }

                //     })

                // }
                }
            });
        };
        
        $scope.getRecentMedia = function (nextIterator) {

        //setting layout
        $scope.setLayout('getRecentMedia');

        instagramApi.getRecentMedia($scope.userId, function (response) {

            $scope.serviceMeta = response.meta;

            $scope.images = $scope.images.concat(response.data);

            $scope.nextIterator = response.pagination.next_max_id;

        }, nextIterator);

    };
        $scope.getFollows = function(nextIterator){

        //setting layout
        $scope.setLayout('getFollows');

        instagramApi.getFollows($scope.userId, function(response){

            $scope.serviceMeta = response.meta;

            $scope.follows = $scope.follows.concat(response.data);

            $scope.nextIterator = response.pagination.next_cursor;

        }, nextIterator);

    };
        $scope.getFollowedBy = function(nextIterator){

        //setting layout
        $scope.setLayout('getFollowedBy');

        instagramApi.getFollowedBy($scope.userId, function(response){

            $scope.serviceMeta = response.meta;

            $scope.followedBy = $scope.followedBy.concat(response.data);

            $scope.nextIterator = response.pagination.next_cursor;

        }, nextIterator);

    };
        $scope.relationship = function(userId, action){
    
            instagramApi.relationship(userId, action);
    
        };
        $scope.loadMore = function(){
    
            $scope.usedNextIterators.push($scope.nextIterator);
    
            eval("$scope."+$scope.layout+"('"+$scope.nextIterator+"')");
    
        };
    }])
    
    .controller('UserSearchController' , ['$scope', function($scope){
        
    }])