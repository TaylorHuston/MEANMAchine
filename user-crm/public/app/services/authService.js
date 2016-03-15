angular.module('authService', [])

//Authentication factory
.factory('Auth', function ($http, $q, AuthToken) {

  //Create empty object
  var authFactory = {};

  //Login
  authFactory.login = function (username, password) {
    //Return promise with data
    return $http.post('/api/authenticate', {
        username: username,
        password: password;
      })
      .success(function (data) {
        AuthToken.setToken(data.token);
        return data;
      });
  };

  //Logout
  authFactory.logout = function () {
    AuthToken.setToken();
  }

  //Check if logged in
  authFactory.isLoggedIn = function () {
    if (AuthToken.getToken()) {
      return true;
    } else {
      return false;
    }
  }

  //Get User info
  authFactory.getUser = function () {
    if (AuthToken.getToken()) {
      return $http.get('/api/me');
    } else {
      return $q.reject({
        message: "No Token"
      });
    };
  };

  return authFactory;
})

//Factory for handling tokens
.factory('AuthToken', function ($window) {

  //Create empty object
  var authTokenFactory = {};

  //Get token
  authTokenFactory.getToken = function () {
    return $window.localStorage.getItem('token');
  }

  //Set or clear token
  authTokenFactory.setToken = function (token) {
    if (token) {
      $window.localStorage.setItem('token', token);
    } else {
      $window.localStorage.removeItem('token');
    };
  };

  return authTokenFactory;

})

//Factory to inject tokens into requests
.factory('AuthInterceptor', function ($q, AuthToken) {

  //Create empty object
  var interceptorFactory = {};

  //Attach token
  interceptorFactory.request = function (config) {

    var token = AuthToken.getToken();

    if (token) {
      config.headers['x-access-token'] = token;
    }

    return config;
  }

  //Redirect incase of bad authentication
  interceptorFactory.responseError = function (response) {

    if (response.status == 403) {
      AuthToken.setToken();
      $location.path('/login');
    }

    return $q.reject(response);
  };

  return interceptorFactory;
});