var app = angular.module("RoutesPractice", ['ui.router']);

app.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('home', {
      url: '/',
      controller: 'HomeController',
      templateUrl: 'views/home.html'
    })
    .state('projects', {
      url: '/projects',
      controller: 'ProjectsController',
      templateUrl: 'views/projects.html'
    })
    .state('bio', {
      url: '/bio',
      controller: 'BioController',
      templateUrl: 'views/bio.html'
    })
    .state('resume', {
      url: '/resume',
      controller: 'ResumeController',
      templateUrl: 'views/resume.html'
    })
    .state('pictures', {
      url: '/pictures/:pictureId',
      templateUrl: 'views/pictures.html',
      controller: 'PictureController'
    });

    $locationProvider.html5Mode(true);
}]);

app.controller('HomeController', ["$scope", "$http", function($scope, $http) {
  $scope.view = {};
  $scope.view.message = "Welcome to the Home Page";
  $http.get('https://api.github.com/zen').then(function(data) {
    $scope.view.zenData = data.data;
  });
  $http.get('./jj.txt').then(function(data) {
    $scope.view.jackJohnsonData = data.data.results[0].collectionName;
  });
  $http.get('https://messagehttpservice.herokuapp.com/messages').then(function(data) {
    $scope.view.getMessageData = data.data;
  });
}]);

app.controller('ProjectsController', ["$scope", function($scope) {
  $scope.view = {};
  $scope.view.message = "Welcome to the Projects Page";
}]);

app.controller('BioController', ["$scope", function($scope) {
  $scope.view = {};
  $scope.view.message = "Welcome to the Bio Page";
}]);

app.controller('ResumeController', ["$scope", function($scope) {
  $scope.view = {};
  $scope.view.message = "Welcome to the Resume Page";
}]);

app.controller('PictureController', ["$scope", "$stateParams", function($scope, $stateParams) {
  $scope.pictureId = $stateParams.pictureId;
}]);










// This is the only thing from previous parts of this unit that I may want a reference back to.. the apply/digest and the custom filter

// angular.module("applydigest", []).controller("MainController", function($rootScope, $scope) {
//   $rootScope.rootView = {};
//   $rootScope.rootView.name = "Fido";
//   $scope.view = {};
//   $scope.view.age = 3;
//
//   $scope.car = "the_cool_car";
//
//   // this is for example purposes
//   // NOTE - there is a $timeout which handles $apply for you
//   setTimeout(function() {
//     $rootScope.rootView.name = "Lassie";
//     $scope.view.age = 10;
//     // $scope.$digest();
//     $scope.$apply();
//   }, 1000);
// });
//
// angular.module('applydigest').filter('kebab', function() {
//   return function(input) {
//     return input.replace(/_/g, "-");
//   };
// });

// angular.module('applydigest').filter('kebab', function() {
//   return function(input) {
//     return input.replace(/_/g, "-");
//   };
// });

/* ******************************************************* */

// Followed by the html with it
//
// <!DOCTYPE html>
// <html lang="en" ng-app="applydigest">
// <head>
//   <meta charset="UTF-8">
//   <title>Document</title>
// </head>
// <body >
//   <div>
//     From $rootScope: {{rootView.name}}
//   </div>
//   <div ng-controller="MainController">
//     From $scope: {{view.age}}
//
//     <h3>{{ car | kebab }}</h3>
//
//   </div>
//
//
//
//   <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.js"></script>
//   <script src="./index-1.js"></script>
// </body>
// </html>
