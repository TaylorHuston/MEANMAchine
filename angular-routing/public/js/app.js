angular.module('routerApp', ['routerRoutes', 'ngAnimate'])

//Main site controller
.controller('mainController', function () {

  var vm = this;
  vm.bigMessage = "Hello";

})

//Home page controller
.controller('homeController', function () {

  var vm = this;
  vm.message = "Home page";
  
})


//About page controller
.controller('aboutController', function () {

  var vm = this;
  vm.message = "About page";

})

//Contact page controller
.controller('contactController', function() {
  
  var vm = this;
  vm.message = "Contact";
  
});

