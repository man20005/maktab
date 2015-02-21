function onLoad() {
	document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
  var myHostToObserve = "http://www.wasmiah.com";

  document.removeEventListener('deviceready', onDeviceReady, false);

  document.addEventListener(connectivity.events.onReachabilityChanged, onReachabilityChanged, false)
  connectivity.observeRemoteHostName(myHostToObserve);
}

function onReachabilityChanged(e) {
  console.log(e.interface);
  switch(e.interface) {
	case connectivity.DISCONNECTED:
	  console.log('DISCONNECTED');
	  break;
	case WIFI:
	  console.log('WIFI');
	  break;
	case WIMAX:
	  console.log('WIMAX');
	  break;
	case ETHERNET:
	  console.log('ETHERNET');
	  break;
	case MOBILE:
	  console.log('MOBILE');
	  break;
	case UNDEFINED:
	  console.log('UNDEFINED');
	  break;
  }

  if (e.connected) {
	console.log("Is connected");
  } else {
	console.log("Is not connected");
  }

  switch(e.observer) {
	case HOST:
	  console.log('HOST');
	  break;
	case INTERNET:
	  console.log('INTERNET');
	  break;
	case LOCALWIFI:
	  console.log('LOCALWIFI');
	  break;
  }
}

/**
* MENU
**/
angular.module('myApp', ['ionic','ajoslin.promise-tracker'])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "menu"
      })

      .state('app.page1', {
        url: "/page1",
        views: {
          'menuContent' :{
            templateUrl: "page1"
          }
        }
      })

      .state('app.page2', {
        url: "/page2",
        views: {
          'menuContent' :{
            templateUrl: "page2"
          }
        }
      })
	  
      .state('app.page3', {
        url: "/page3",
        views: {
          'menuContent' :{
            templateUrl: "page3"
          }
        }
      })

      .state('app.page4', {
        url: "/page4",
        views: {
          'menuContent' :{
            templateUrl: "page4"
          }
        }
      })

      .state('app.page5', {
        url: "/page5",
        views: {
          'menuContent' :{
            templateUrl: "page5"
          }
        }
      })
	  
      .state('app.page6', {
        url: "/page6",
        views: {
          'menuContent' :{
            templateUrl: "page6"
          }
        }
      })

      .state('app.page7', {
        url: "/page7",
        views: {
          'menuContent' :{
            templateUrl: "page7"
          }
        }
      })

      .state('app.page8', {
        url: "/page8",
        views: {
          'menuContent' :{
            templateUrl: "page8"
          }
        }
      })
	  
      .state('app.page9', {
        url: "/page9",
        views: {
          'menuContent' :{
            templateUrl: "page9"
          }
        }
      })

      .state('app.page10', {
        url: "/page10",
        views: {
          'menuContent' :{
            templateUrl: "page10"
          }
        }
      })

      .state('app.page11', {
        url: "/page11",
        views: {
          'menuContent' :{
            templateUrl: "page11"
          }
        }
      })
	  
      .state('app.page12', {
        url: "/page12",
        views: {
          'menuContent' :{
            templateUrl: "page12"
          }
        }
      })	  	  	  

    $urlRouterProvider.otherwise('/app/page1');

  })
  
  /**
 * Process compete form
 */
  .controller('competeCtrl', function ($scope, $http, $log, promiseTracker, $timeout) {
    $scope.subjectListOptions = {
      'swedish': 'Swedish',		
      'indonesia': 'Indonesia',
      'ethiopia': 'Ethiopia',
      'Uganda': 'Uganda',
      'other': 'Other'
    };

    // Inititate the promise tracker to track form submissions.
    $scope.progress = promiseTracker();

    // Form submit handler.
    $scope.submit = function(form) {
      // Trigger validation flag.
      $scope.submitted = true;

      // If form is invalid, return and let AngularJS show validation errors.
      if (form.$invalid) {
        return;
      }
		
      	// Default values for the request.
     	var config = {
          'name' : $scope.name,
          'tel' : $scope.tel,		  
          'email' : $scope.email,
          'subjectList' : $scope.subjectList,
          'desc' : $scope.comments
      	};

      // Ajax
      var $promise = 
	  	$http({
			method: 'POST',
			url: 'http://www.wasmiah.com/dev/insComp.php',
			data: config,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
        .success(function(data, status, headers, config) {	
			window.plugins.toast.showLongCenter('Submitted Succesfully');
        
		    $scope.name = null;
            $scope.tel = null;			
            $scope.email = null;
            $scope.subjectList = null;
            $scope.comments = null;
            //$scope.messages = 'Your form has been sent!';
            $scope.submitted = false;
        })
        .error(function(data, status, headers, config) {
          $scope.progress = data;
          $scope.messages = 'There was a network error. Try again later.';
          $log.error(data);
        })
        .finally(function() {
          // Hide status messages after three seconds
          $timeout(function() {
            $scope.messages = null;
          }, 3000);
        });

      // Track the request and show its progress to the user
      $scope.progress.addPromise($promise);
	};
})

.controller('feedbackCtrl', function ($scope, $http) {
	
	// Default values for the request.
	var feedbackData = {
//	  'name' : $scope.name,
//	  'tel' : $scope.tel,
	  'feedback' : $scope.feedback
	};
	
	$scope.feedbackForm = function() {
	  $http({
		  method  : 'POST',
		  url     : 'http://www.wasmiah.com/dev/feedback.php',
		  data    : {'feedback' : $scope.feedback},
		  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
		 })
	  .success(function(data) {
		console.log(data);
		window.plugins.toast.showLongBottom('Your Feedback was sent succesfully!');
	//	$scope.feedback = null;
		if (!data.success) {
		} else {
		  // if successful, bind success message to message
		  $scope.message = data.message;
		}
	  });
	};
});