angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
  
  $routeProvider
  
  //Home page
  .when('/', {
    templateUrl : 'app/views/pages/home.html'
  })
  
  //Login page
  .when('/login', {
    templateUrl : 'app/views/pages/login.html',
    controller : 'mainController',
    controllerAs : 'login'
  })
  
  //All users
  .when('/users', {
    templateUrl : 'app/views/pages/users/all.html',
    controller : 'userController',
    controllerAs : 'user'
  });
  
  $locationProvider.html5Mode(true);
  
});