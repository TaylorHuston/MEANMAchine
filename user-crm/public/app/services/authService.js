angular.module('authService', [])

//Authentication factory
.factory('Auth', function($http, $q, AuthToken) {
  
  //Create empty object
  var authFactory = {};
  
  //Login
  
  //Logout
  
  //Check if logged in
  
  //Get User info
  
  return authFactory;
})

//Factory for handling tokens
.factory('AuthToken', function($window) {
  
  //Create empty object
  var authTokenFactory = {};
  
  //Get token
  authTokenFactory.getToken = function() {
    return $window.localStorage.getItem('token');
  }
  
  //Set or clear token
  authTokenFactory.setToken = function(token) {
    if (token) {
      $window.localStorage.setItem('token', token);
    } else {
      $window.localStorage.removeItem('token');
    };
  };
  
  return authTokenFactory;
  
})

//Factory to inject tokens into requests
.factory('AuthInterceptor', function($q, AuthToken) {
  
  //Create empty object
  var interceptorFactory = {};
  
  //Attach token
  
  //Redirect incase of bad authentication
  
  return interceptorFactory;
});