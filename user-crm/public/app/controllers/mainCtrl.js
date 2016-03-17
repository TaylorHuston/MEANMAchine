angular.module('mainCtrl', [])

.controller('mainController', function ($rootScope, $location, Auth) {

  var vm = this;

  vm.loggedIn = Auth.isLoggedIn();

  $rootScope.$on('$routeChangeStart', function () {
    vm.loggedIn = Auth.isLoggedIn();

    // get user information on page load
    Auth.getUser()
      .then(function (data) {
        vm.user = data.data;
      });
  });

  //Handle login
  vm.doLogin = function () {

    Auth.login(vm.loginData.username, vm.loginData.password)
      .success(function (data) {

        // if a user successfully logs in, redirect to users page		
        $location.path('/users');

      });
  };

  // function to handle logging out
  vm.doLogout = function () {
    Auth.logout();
    vm.user = {};
  

    $location.path('/login');
  };


});