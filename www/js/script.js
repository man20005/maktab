var app = angular.module('formApp', ['ionic'])

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home')

  $stateProvider.state('home', {
    url: '/home',
    views: {
      home: {
        templateUrl: 'home.html'
      }
    }
  })

  $stateProvider.state('help', {
    url: '/help',
    views: {
      help: {
        templateUrl: 'help.html'
      }
    }
  })
})

angular.module("formApp", []).controller("formController", function($scope, $http) {

// create a blank object to hold our form information
// $scope will allow this to pass between controller and view
$scope.formData = {};

// process the form
$scope.processForm = function(formData) {
	$http({
		method : 'POST',
		url : 'http://www.wasmiah.com/insComp.php',
		data : $scope.formData,
		headers : { 'Content-Type': 'application/x-www-form-urlencoded' } // set the headers so angular passing info as form data (not request payload)
	})
		.success(function(data) {
		console.log(data);
	if (!data.success) {
		// if not successful, bind errors to error variables
		$scope.errorName = data.errors.name;
		//TODO.. the others
	} else {
		// if successful, bind success message to message
		$scope.message = data.message;
			}
		});
	};
});