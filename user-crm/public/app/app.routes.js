angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
  
  $routeProvider
  //Home page
  .when('/', {
    templateUrl : 'app/views/pages/home.html'
  });
  
  $locationProvider.html5Mode(true);
  
});