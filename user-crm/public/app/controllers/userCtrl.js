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

  //Delete a user
  vm.deleteUser = function (id) {
    vm.processing = true;

    User.delete(id)
      .success(function (data) {

      })

  }

})

.controller('userCreateController', function (User) {

  var vm = this;

  vm.type = 'create';

  //Create a user
  vm.saveUser = function () {
    vm.processing = true;

    vm.message = "";

    User.create(vm.userData)
      .success(function (data) {
        vm.processing = false;

        vm.userData = {};
        vm.message = data.message;
      });

  };

})

.controller('userEditController', function ($routeParams, User) {

  var vm = this;

  vm.type = 'edit'

  //Get the information for the user you want to edit
  User.get($routeParams.user_id)
    .success(function (data) {
      vm.userData = data;
    })

  //Save the User
  vm.saveUser = function () {
    vm.processing = true;
    vm.message = "";
    console.log(vm.userData);

    User.update($routeParams.user_id, vm.userData)
      .success(function (data) {
        vm.processing = false;
        vm.userData = {}
        vm.message = data.message;
      });

  };

});