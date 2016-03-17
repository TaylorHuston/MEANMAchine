angular.module('userCtrl', ['userService'])

.controller('userController', function (User) {

  var vm = this;

  vm.processing = true;

  //Grab all users at page load
  User.all()
    .success(function (data) {

      vm.processing = false;
      vm.users = data;

    });

})