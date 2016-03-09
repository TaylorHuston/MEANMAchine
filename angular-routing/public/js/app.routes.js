angular.module('routerRoutes', ['ngRoute'])

//Configure routes
.config(function ($routeProvider, $locationProvider) {
  $routeProvider

  //Home page
    .when('/', {
    templateUrl: 'views/pages/home.html',
    controller: 'homeController',
    controllerAs: 'home'
  })

  //About page
  .when('/about', {
    templateUrl: 'views/pages/about.html',
    controller: 'aboutController',
    controllerAs: 'about'
  })

  //Contact page
  .when('/contact', {
    templateUrl: 'views/pages/contact.html',
    controller: 'contactController',
    controllerAs: 'contact'
  });

  //Pretty URLS
  $locationProvider.html5Mode(true);
});