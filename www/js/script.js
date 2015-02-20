function onLoad() {
	document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
  var myHostToObserve = "www.wasmiah.com";

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
 * Process the form
 */
angular.module('myApp', ['ajoslin.promise-tracker'])
  .controller('help', function ($scope, $http, $log, promiseTracker, $timeout) {
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
        params : {
          'callback' : 'JSON_CALLBACK',
          'name' : $scope.name,
          'tel' : $scope.tel,		  
          'email' : $scope.email,
          'subjectList' : $scope.subjectList,
          'desc' : $scope.comments
        },
      };

      // JSONP request
      var $promise = $http.jsonp('http://wasmiah.com/dev/insComp.php', config)
        .success(function(data, status, headers, config) {
          if (data.status == 'OK') {
            $scope.name = null;
            $scope.tel = null;			
            $scope.email = null;
            $scope.subjectList = null;
            $scope.comments = null;
            $scope.messages = 'Your form has been sent!';
            $scope.submitted = false;
          } else {
            $scope.messages = 'Oops, we received your request, but there was an error processing it.';
            $log.error(data);
          }
        })
        .error(function(data, status, headers, config) {
          $scope.progress = data;
          $scope.messages = 'There was a network error. Try again later.';
          $log.error(data);
        })
        .finally(function() {
          // Hide status messages after three seconds.
          $timeout(function() {
            $scope.messages = null;
          }, 3000);
        });

      // Track the request and show its progress to the user.
      $scope.progress.addPromise($promise);
    };
  });